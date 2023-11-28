<script setup>
import { ref } from 'vue';

import VoteRateChart from '../components/VoteRateChart.vue';
import voteData from '../assets/data/VoteRateOverview.json';
import PresidentialVoterTurnout from '../assets/data/PresidentialVoterTurnout.json';

const activeTab = ref(0);
const tabs = [
  { title: '第 15 任 總統副總統大選', content: 'Tab 1 content', disabled: true }
];
const city = ref([
  '台北市',
  '新北市',
  '桃園市',
  '宜蘭縣',
  '新竹縣',
  '苗栗縣',
  '台中市',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義縣',
  '台南市',
  '高雄市',
  '屏東縣',
  '台東縣',
  '花蓮縣',
  '澎湖縣',
  '金門縣',
  '連江縣'
]);
// 台灣各縣市底下鄉鎮市區名稱
const townData = ref([
  {
    city: '台北市',
    town: '中正區,中山區,大同區,松山區,大安區,萬華區,信義區,士林區,北投區,內湖區,南港區,文山區'
  },
  {
    city: '新北市',
    town: '萬里區,金山區,板橋區,汐止區,深坑區,石碇區,瑞芳區,平溪區,雙溪區,貢寮區,新店區,坪林區,烏來區,永和區,中和區,土城區,三峽區,樹林區,鶯歌區,三重區,新莊區,泰山區,林口區,蘆洲區,五股區,八里區,淡水區,三芝區,石門區'
  },
  {
    city: '桃園市',
    town: '中壢區,平鎮區,龍潭區,楊梅區,新屋區,觀音區,桃園區,龜山區,八德區,大溪區,復興區,大園區,蘆竹區'
  },
  {
    city: '宜蘭縣',
    town: '宜蘭市,頭城鎮,礁溪鄉,壯圍鄉,員山鄉,羅東鎮,三星鄉,大同鄉,五結鄉,冬山鄉,蘇澳鎮,南澳鄉'
  },
  {
    city: '新竹縣',
    town: '竹北市,湖口鄉,新豐鄉,新埔鎮,關西鎮,芎林鄉,寶山鄉,竹東鎮,五峰鄉,橫山鄉,尖石鄉,北埔鄉,峨眉鄉'
  }
]);
const citySelect = ref(null);
const selectCity = (item) => {
  citySelect.value = item;
};
const TOWN_DATA = computed(() => {
  if (citySelect.value) {
    return townData.value
      .find((item) => item.city === citySelect.value)
      .town.split(',');
  }
  return [];
});

const selectTown = (item) => {
  console.log(item);
};
</script>

<template>
  <nav
    class="bg-nav-primary px-48px py-18px text-32px leading-tight font-inter font-noto text-white"
  >
    <h1>2020開票地圖</h1>
  </nav>
  <main class="h-screen bg-main-primary px-48px py-40px font-noto">
    <div>
      <div>
        <div class="flex gap-20px">
          <button
            class="cursor-pointer pb-12px text-20px text-20px font-semibold leading-24px font-inter font-noto text-#BFBFBF transition-colors duration-200 ease-in-out"
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{
              'border-solid border-0 border-b-4 border-nav-primary text-black':
                activeTab === index
            }"
            @click="activeTab = index"
          >
            {{ tab.title }}
          </button>
        </div>
        <div class="mt-20px flex gap-20px">
          <DropdownComponent @update:modelValue="selectCity" :data="city" />
          <DropdownComponent
            @update:modelValue="selectTown"
            :data="TOWN_DATA"
          />
          <button
            type="button"
            class="flex items-center rounded-8px bg-nav-primary px-12px text-white"
          >
            清除
            <img
              class="ml-8px inline-block"
              src="@/assets/icons/reset.svg"
              alt=""
            />
          </button>
        </div>
        <div class="mt-40px w-270px gap-4">
          <div class="left-card rounded-8px bg-white p-20px">
            <div class="first-chart">
              <h3 class="text-20px font-semibold leading-24px">投票概況</h3>
              <div class="mb-20px flex">
                <div class="w-50%">
                  <VoteRateChart />
                </div>
                <div class="w-full flex flex-col items-start justify-center">
                  <p class="text-20px font-semibold leading-24px">
                    {{ voteData[0].VoterTurnout }}
                  </p>
                  <p class="text-16px font-normal leading-22px">投票率</p>
                </div>
              </div>
              <div
                class="flex flex-col gap-8px text-16px font-normal leading-22px"
              >
                <p>
                  投票數
                  <span class="text-12px font-semibold leading-17px"
                    >{{ voteData[0].TotalVotes }}票</span
                  >
                </p>
                <p>
                  無效票數
                  <span class="text-12px font-semibold leading-17px"
                    >{{ voteData[0].InvalidVotes }}票</span
                  >
                </p>
                <p>
                  有效票數
                  <span class="text-12px font-semibold leading-17px"
                    >{{ voteData[0].ValidVotes }}票</span
                  >
                </p>
              </div>
            </div>
            <div class="secend-chart mt-40px">
              <div class="w-50%">
                <PresidentialVoterTurnoutChart
                  :data="PresidentialVoterTurnout"
                />
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
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
* {
  // outline: 1px solid;
}
</style>
