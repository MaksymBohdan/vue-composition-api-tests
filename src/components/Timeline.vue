<template>
  <div class="message is-primary is-marginless">
    <div class="message-header">
      <p>Posts</p>
    </div>
  </div>
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

    <TimelinePost v-for="post in posts" :key="post.id" :post="post" />
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import moment from 'moment';
// COMONENTS
import TimelinePost from './TimelinePost.vue';
import Panel from './Panel.vue';
// OTHERS
import { useStore } from '@/store';
import { Period, Post } from '@/types';

export default defineComponent({
  components: { TimelinePost, Panel },
  async setup() {
    const periods: Period[] = ['Today', 'This week', 'This month'];
    const selectedPeriod = ref<Period>('Today');
    const setPeriod = (period: Period) => (selectedPeriod.value = period);

    // STORE
    const store = useStore();

    if (!store.getState().posts.loaded) {
      await store.fetchPosts();
    }

    const allPosts = store.getState().posts.ids.reduce<Post[]>((acc, id) => {
      const post = store.getState().posts.all[id];
      return acc.concat(post);
    }, []);

    const posts = computed(() =>
      allPosts.filter((post) => {
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
