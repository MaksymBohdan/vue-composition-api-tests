<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-end">
      <div class="buttons">
        <router-link class="button" to="/posts/new">New post</router-link>
        <button class="button" @click="modal.showModal">Signup</button>
      </div>
    </div>
    <teleport to="#modal" v-if="modal.visible.value">
      MODAL
    </teleport>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useModal } from '../compositions/useModal';

export default defineComponent({
  setup() {
    return {
      modal: useModal(),
    };
  },
});
</script>
