<script setup>
import { ref } from 'vue';
import axios from 'axios';
import VoteRateChart from '../components/VoteRateChart.vue';
import voteData from '../assets/data/VoteRateOverview.json';
import PresidentialVoterTurnout from '../assets/data/PresidentialVoterTurnout.json';
import PartyVoteState from '../components/PartyVoteState.vue';

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

const TOWN_DATA = computed(() => {
  if (citySelect.value) {
    return townData.value
      .find((item) => item.city === citySelect.value)
      .town.split(',');
  }
  return [];
});
// 2020全國投票資料
const taiwanVoteData = ref(null);
const getVoteData = async () => {
  const res = await axios.get(
    'https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/1f7d9f4f6bfe06fdaf4db7df2ed4d60c/N/00_000_00_000_0000.json'
  );
  [taiwanVoteData.value] = res.data['00_000_00_000_0000'];
};

const presidentialVoterTurnoutData = ref(null);
const getPresidentialVoterTurnoutData = async () => {
  const res = await axios.get(
    'https://db.cec.gov.tw/static/elections/data/statistics/ticket_percents/ELC/P0/00/N/00_000_00_000_0000.json'
  );
  // console.log(res);
  presidentialVoterTurnoutData.value = res.data[0].items
    .filter((item) => item.vote_date === '2020-01-11')
    .map((item) => {
      return {
        party_name: item.party_name,
        ticket_percent: item.ticket_percent,
        ticket_num: item.ticket_num
      };
    });
  // console.log(presidentialVoterTurnoutData.value);
};

// 取得台灣縣市代碼
// 63_000_00_000_0000台北
const taiwanCityCode = ref([]);
const getTaiwanCityCode = async () => {
  const res = await axios.get(
    'https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/1f7d9f4f6bfe06fdaf4db7df2ed4d60c/C/00_000_00_000_0000.json'
  );
  taiwanCityCode.value = res.data['00_000_00_000_0000'];
  console.log('data', taiwanCityCode);
};
// 選擇後城市item
const citySelect = ref(null);
const selectCity = async (item) => {
  console.log(item);
  citySelect.value = item;
  await getTownCode();
};

// 取得鄉鎮市區代碼
const townCode = ref([]);
const getTownCode = async () => {
  console.log('test');
  const cityCode = citySelect.value.prv_code;
  try {
    const res = await axios.get(
      `https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/1f7d9f4f6bfe06fdaf4db7df2ed4d60c/D/${cityCode}_000_00_000_0000.json`
    );
    townCode.value = res.data[`${cityCode}_000_00_000_0000`];
  } catch (error) {
    console.log(error);
  }
};
const selectTown = async (item) => {
  console.log(item);
};

const init = () => {
  getVoteData();
  getPresidentialVoterTurnoutData();
  getTaiwanCityCode();
};

onMounted(() => {
  init();
});
</script>

<template>
  <nav
    class="bg-nav-primary px-48px py-18px text-32px leading-tight font-inter font-noto text-white"
  >
    <h1>2020開票地圖</h1>
  </nav>
  <main class="h-screen bg-main-primary px-48px py-40px font-noto">
    <div>
      <div class="">
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
          <DropdownComponent @select-city="selectCity" :area="taiwanCityCode" />
          <DropdownComponent :area="townCode" @select-city="selectTown" />
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
        <div class="mt-40px flex">
          <PartyVoteState
            :taiwanVoteData="taiwanVoteData"
            :presidentialVoterTurnoutData="presidentialVoterTurnoutData"
          />
          <VoteMap />
          <div class="">
            <test />
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
