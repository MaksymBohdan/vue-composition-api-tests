<template>
  <div class="columns">
    <div class="column" />
    <div class="column is-two-thirds">
      <router-link
        data-test="can-edit"
        v-if="canEdit"
        :to="to"
        class="button is-rounded is-link is-pulled-right"
      >
        <i class="fas fa-edit" />
      </router-link>
      <h1>Post title is: {{ post.title }}</h1>
      <div v-html="post.html" />
    </div>
    <div class="column" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '../store';
export default defineComponent({
  async setup() {
    const route = useRoute();
    const store = useStore();
    const id = route.params.id as string;
    const post = store.getState().posts.all[id];
    const canEdit = store.getState().authors.currentUserId === post.authorId;

    if (!store.getState().posts.loaded) {
      await store.fetchPosts();
    }

    return {
      post,
      to: `/posts/${post.id}/edit`,
      canEdit,
    };
  },
});
</script>
