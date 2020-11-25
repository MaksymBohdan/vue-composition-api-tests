<template>
  <router-link :to="to" data-test="post" class="panel-block">
    <div>
      <a data-test="title">{{ post.title }}</a>
      <div data-test="created">{{ post.created.format('Do MMM') }}</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Post } from '@/types';

import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },

  setup(props) {
    return {
      to: `/posts/${props.post.id}`,
    };
  },
});
</script>

<style></style>
