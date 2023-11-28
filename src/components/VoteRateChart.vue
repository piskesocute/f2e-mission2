<script setup>
import { onMounted, ref } from 'vue';
import { Chart } from 'chart.js/auto';

import voteData from '../assets/data/VoteRateOverview.json';

const voterTurnout = parseFloat(voteData[0].VoterTurnout);
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  width: {
    type: Number,
    default: 300
  }
});

const canvas = ref(null);

onMounted(() => {
  const ctx = canvas.value.getContext('2d');
  const testChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [voterTurnout, 100 - voterTurnout],
          backgroundColor: ['rgb(38,46,73)', 'rgb(217,217,217)']
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
  <canvas id="myChart" ref="canvas"></canvas>
</template>
<style lang="scss" scoped></style>
