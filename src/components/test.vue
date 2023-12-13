<script setup>
import voteData from '../assets/data/VoteRateOverview.json';
import PresidentialVoterTurnout from '../assets/data/PresidentialVoterTurnout.json';

const maxVotePercentage = PresidentialVoterTurnout.reduce((prev, current) =>
  prev.vote_percentage > current.vote_percentage ? prev : current
);
const props = defineProps({
  title: {
    type: String,
    default: '台北市'
  },
  data: {
    type: Array
  }
});
</script>
<template>
  <div
    class="mt-20px w-260px flex flex-col gap-8px border-2 rounded-8px px-20px py-12px"
    :class="{
      ' border-#84CB98 bg-#84CB9820': maxVotePercentage.party === '民主進步黨',
      'border-#8894D8 bg-#8894D8': maxVotePercentage.party === '中國國民黨',
      'border-#DFA175 bg-#DFA175': maxVotePercentage.party === '親民黨'
    }"
  >
    <p class="text-20px font-semibold leading-24px font-noto">{{ title }}</p>
    <div
      v-for="item in PresidentialVoterTurnout"
      :key="item.candidate_order"
      class="flex gap-12px"
    >
      <div
        class="h-24px w-24px flex items-center justify-center rounded-full text-center"
        :class="{
          'bg-#84CB98': item.candidate_order === '3',
          'bg-#8894D8': item.candidate_order === '2',
          'bg-#DFA175': item.candidate_order === '1'
        }"
      >
        <p class="text-12px font-semibold leading-17px text-white">
          {{ item.candidate_order }}
        </p>
      </div>
      <div class="flex gap-18px">
        <div class="w-84px">
          <p class="text-16px font-semibold leading-22px">
            {{ item.party }}
          </p>
          <p class="text-12px font-normal leading-17px">
            {{ item.president }} | {{ item.vice_president }}
          </p>
        </div>
        <div
          class="w-2px"
          :class="{
            'bg-#84CB98': item.candidate_order === '3',
            'bg-#8894D8': item.candidate_order === '2',
            'bg-#DFA175': item.candidate_order === '1'
          }"
        ></div>
      </div>
      <div>
        <p class="text-16px font-semibold leading-22px">
          {{ item.vote_percentage }}%
        </p>
        <p class="text-12px font-normal leading-17px">{{ item.votes }}票</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
* {
  // outline: 1px solid;
}
</style>
