<template>
  <div>
    <nav class="panel is-primary">
      <p class="panel-tabs is-primary">
        <Panel
          v-for="period in periods"
          :key="period"
          :period="period"
          :selectedPeriod="selectedPeriod"
          @set-period="setPeriod"
        />
      </p>
    </nav>

    <TimelinePost v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import moment from 'moment';
import TimelinePost from './TimelinePost.vue';
import Panel from './Panel.vue';

import { Period } from '@/types';
import { todayPost, thisWeekPost, thisMonthPost } from '@/mocks';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default defineComponent({
  components: { TimelinePost, Panel },
  async setup() {
    const periods: Period[] = ['Today', 'This week', 'This month'];
    const selectedPeriod = ref<Period>('Today');
    const setPeriod = (period: Period) => (selectedPeriod.value = period);

    await delay(2000);

    const posts = computed(() =>
      [todayPost, thisWeekPost, thisMonthPost].filter((post) => {
        if (
          selectedPeriod.value === 'Today' &&
          post.created.isAfter(moment().subtract(1, 'day'))
        ) {
          return true;
        }
        if (
          selectedPeriod.value === 'This week' &&
          post.created.isAfter(moment().subtract(1, 'weeks'))
        ) {
          return true;
        }
        if (
          selectedPeriod.value === 'This month' &&
          post.created.isAfter(moment().subtract(1, 'month'))
        ) {
          return true;
        }

        return false;
      }),
    );

    return { periods, selectedPeriod, setPeriod, posts };
  },
});
</script>

<style></style>
