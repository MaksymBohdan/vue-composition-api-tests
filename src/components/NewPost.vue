<template>
  <section class="section">
    <PostWriter :post="post" @save="save" />
  </section>
</template>

<script lang="ts">
import moment from 'moment';
import { defineComponent } from 'vue';
import PostWriter from '@/components/PostWriter.vue';
import { Post } from '@/types';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NewPost',

  components: {
    PostWriter,
  },

  setup() {
    // STORE
    const store = useStore();
    const router = useRouter();

    const post: Post = {
      id: -1,
      title: 'New post',
      markdown: '## New post\n Enter your post here...',
      html: '',
      authorId: 0,
      created: moment(),
    };

    const save = async (post: Post) => {
      await store.saveNewPost(post);
      router.push('/');
    };

    return { post, save };
  },
});
</script>

<style></style>
