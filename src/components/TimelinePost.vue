<template>
  <a data-test="post" class="panel-block">
    <div>
      <a data-test="title">{{ post.title }}</a>
      <div data-test="created">{{ post.created.format('Do MMM') }}</div>
    </div>
  </a>
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
});
</script>

<style></style>
