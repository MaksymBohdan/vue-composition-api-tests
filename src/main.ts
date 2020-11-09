import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from '@/router';
import '@/assets/main.scss';
import * as mocks from '@/mocks';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// @ts-ignore
axios.get = async (url: string) => {
  await delay(1000);

  if ((url = '/posts')) {
    return Promise.resolve({
      data: [mocks.todayPost, mocks.thisWeekPost, mocks.thisMonthPost],
    });
  }
};
createApp(App)
  .use(router)
  .mount('#app');
