import { Post, Author } from './types/index';
import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from '@/router';
import * as mocks from '@/mocks';
import '@/assets/main.scss';
import 'highlight.js/styles/solarized-dark.css';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// @ts-ignore
axios.get = async (url: string) => {
  await delay(1000);

  if (url === '/posts') {
    return Promise.resolve({
      data: [mocks.todayPost, mocks.thisWeekPost, mocks.thisMonthPost],
    });
  }
};
// @ts-ignore
axios.post = async (url: string, payload: Post | Author) => {
  await delay(1000);

  if (url === '/posts') {
    return Promise.resolve({
      data: { ...payload, id: Date.now().toString() },
    });
  }

  if (url === '/users') {
    const { id: oldId, ...rest } = payload;

    return Promise.resolve({
      data: { id: Date.now().toString(), ...rest },
    });
  }
};
createApp(App)
  .use(router)
  .mount('#app');
