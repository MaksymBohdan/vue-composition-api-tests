<template>
  <section class="section">
    <PostWriter :post="post" />
  </section>
</template>

<script lang="ts">
import moment from 'moment';
import { defineComponent } from 'vue';
import PostWriter from '@/components/PostWriter.vue';
import { Post } from '@/types';

export default defineComponent({
  name: 'NewPost',

  components: {
    PostWriter,
  },

  setup() {
    const post: Post = {
      id: -1,
      title: 'New post',
      markdown: '## New post\n Enter your post here...',
      html: '',
      authorId: 0,
      created: moment(),
    };

    return { post };
  },
});
</script>

<style></style>
