<script setup>
import voteData from '../assets/data/VoteRateOverview.json';
import PresidentialVoterTurnout from '../assets/data/PresidentialVoterTurnout.json';

const props = defineProps({
  taiwanVoteData: { type: Object, default: () => ({}) }
});

watch(
  () => props.taiwanVoteData,
  (newVal) => {
    console.log(newVal);
  }
);
</script>
<template>
  <div class="w-270px gap-4">
    <div class="left-card rounded-8px bg-white p-20px">
      <div class="first-chart">
        <h3 class="text-20px font-semibold leading-24px">投票概況</h3>
        <div class="mb-20px flex">
          <div class="w-50%">
            <VoteRateChart />
          </div>
          <div class="w-full flex flex-col items-start justify-center">
            <p class="text-20px font-semibold leading-24px">
              {{ taiwanVoteData?.vote_to_elect }}%
            </p>
            <p class="text-16px font-normal leading-22px">投票率</p>
          </div>
        </div>
        <div class="flex flex-col gap-8px text-16px font-normal leading-22px">
          <p>
            投票數
            <span class="text-12px font-semibold leading-17px"
              >{{ taiwanVoteData?.vote_ticket }}票</span
            >
          </p>
          <p>
            無效票數
            <span class="text-12px font-semibold leading-17px"
              >{{ taiwanVoteData?.invalid_ticket }}票</span
            >
          </p>
          <p>
            有效票數
            <span class="text-12px font-semibold leading-17px"
              >{{ taiwanVoteData?.valid_ticket }}票</span
            >
          </p>
        </div>
      </div>
      <div class="secend-chart mt-40px">
        <div class="w-50%">
          <PresidentialVoterTurnoutChart :data="PresidentialVoterTurnout" />
        </div>
        <div class="mt-20px flex flex-col gap-8px">
          <div
            v-for="item in PresidentialVoterTurnout"
            :key="item.candidate_order"
            class="w-100% flex gap-12px"
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
              <p class="text-12px font-normal leading-17px">
                {{ item.votes }}票
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
