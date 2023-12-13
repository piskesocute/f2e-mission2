<script setup>
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import vote2020 from '@/assets/vote2020.json';
import taiwanMap from '@/assets/COUNTY_MOI_10908204.json';

const props = defineProps({
  voteData: { type: Object, default: vote2020 }
});
const cityList = computed(() => {
  return props.voteData.city;
});

const selectedCounty = ref(null);
const map = ref(null);
const width = 800;
const height = 600;
const svg = d3.create('svg');
const g = svg.append('g');
// 設定投影位置 (中心點經緯度、縮放大小)
const projection = d3.geoMercator().center([120, 24.1]).scale(8000);
const kinmenProjection = d3.geoMercator().center([120, 24.1]).scale(10000);
// 澎湖縣
const penghuProjection = d3.geoMercator().center([120, 24.1]).scale(12000);
// 連江縣
const lianjiangProjection = d3.geoMercator().center([120, 24.1]).scale(15000);
// 設定地圖路徑產生器
const path = d3.geoPath(projection);

const findLargestParty = (cityName) => {
  const cityData = cityList.value.find((city) => city.City === cityName);
  if (!cityData) return '#bfbfbf';

  const maxVotes = Math.max(cityData.PFP, cityData.KMT, cityData.DPP);

  if (maxVotes === cityData.PFP) {
    const percent = ((cityData.PFP / cityData.Total) * 100).toFixed(2);
    return d3.scaleQuantize().domain([0, 100]).range(['#fcdfcb', '#DFA175'])(
      percent
    );
  }

  if (maxVotes === cityData.KMT) {
    const percent = ((cityData.KMT / cityData.Total) * 100).toFixed(2);
    return d3.scaleQuantize().domain([0, 100]).range(['#c8cce6', '#8894D8'])(
      percent
    );
  }

  if (maxVotes === cityData.DPP) {
    const percent = ((cityData.DPP / cityData.Total) * 100).toFixed(2);
    return d3.scaleQuantize().domain([0, 100]).range(['#d7e9dc', '#84CB98'])(
      percent
    );
  }
  return '#bfbfbf';
};

const clicked = (event, data) => {
  if (selectedCounty.value === data.properties.COUNTYNAME) {
    d3.select(event.target).style('fill', (d) => {
      d3.rgb(findLargestParty(d.properties.COUNTYNAME)).brighter(0).toString();
    });
    selectedCounty.value = null;
    return;
  }
  selectedCounty.value = data.properties.COUNTYNAME;

  g.selectAll('.county').style('fill', (d) =>
    findLargestParty(d.properties.COUNTYNAME)
  );

  d3.select(event.target).style('fill', (d) =>
    d3.rgb(findLargestParty(d.properties.COUNTYNAME)).brighter(0.9).toString()
  );
};

const drawMap = () => {
  const tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  svg
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`);

  g.selectAll('path')
    .data(feature(taiwanMap, taiwanMap.objects.COUNTY_MOI_1090820).features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('d', (d) => {
      if (d.properties.COUNTYNAME === '金門縣') {
        return d3.geoPath(kinmenProjection)(d);
      }
      if (d.properties.COUNTYNAME === '澎湖縣') {
        return d3.geoPath(penghuProjection)(d);
      }
      if (d.properties.COUNTYNAME === '連江縣') {
        return d3.geoPath(lianjiangProjection)(d);
      }
      return d3.geoPath(projection)(d);
    })
    .attr('class', 'county')
    .attr('fill', (d) => {
      return findLargestParty(d.properties.COUNTYNAME);
    })
    .attr('stroke', 'white') // 設定線條顏色為黑色
    .attr('stroke-width', 1) // 設定線條寬度為2
    .attr('transform', (d) => {
      if (d.properties.COUNTYNAME === '金門縣') {
        return 'translate(170,50)';
      }
      if (d.properties.COUNTYNAME === '澎湖縣') {
        return 'translate(-30,0)';
      }
      if (d.properties.COUNTYNAME === '連江縣') {
        return 'translate(-100,400)';
      }
      return '';
    })
    .on('click', clicked)
    .on('mouseover', (event, d) => {
      tooltip.transition().duration(200).style('opacity', 0.9);
      tooltip
        .html(d.properties.COUNTYNAME)
        .style('left', `${event.pageX}px`)
        .style('top', `${event.pageY - 28}px`);
    })
    .on('mousemove', (event, d) => {
      tooltip
        .style('left', `${event.pageX}px`)
        .style('top', `${event.pageY - 28}px`);
    })
    .on('mouseout', (d) => {
      tooltip.transition().duration(500).style('opacity', 0);
    });
  map.value.appendChild(svg.node());
};

onMounted(() => {
  drawMap();
});
</script>

<template>
  <section class="w-100% flex">
    <div class="" ref="map"></div>
  </section>
</template>

<style>
.tooltip {
  position: absolute;
  text-align: center;
  width: 60px;
  height: 28px;
  padding: 2px;
  font: 12px sans-serif;
  color: #fff;
  background: #000;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}
</style>
