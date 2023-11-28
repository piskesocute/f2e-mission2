<script setup>
import { onMounted, ref } from 'vue';
import { Chart } from 'chart.js/auto';

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

const voteArr = ref([]);

const getVoteArr = () => {
  voteArr.value = props.data.map((item) => {
    return item.vote_percentage;
  });
};

const PresidentialVoterTurnoutChartRef = ref(null);

onMounted(() => {
  getVoteArr();

  const ctx = PresidentialVoterTurnoutChartRef.value.getContext('2d');
  const PresidentialVoterTurnoutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: ['57.13', '38.61', '4.26'],
          backgroundColor: [
            'rgb(132,203,152)',
            'rgb(136,148,216)',
            'rgb(223,161,117)'
          ]
        }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          enabled: false
        }
      }
    }
  });
});
</script>
<template>
  <canvas id="myChart" ref="PresidentialVoterTurnoutChartRef"></canvas>
</template>
<style lang="scss" scoped></style>
