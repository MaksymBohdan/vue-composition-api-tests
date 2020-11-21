<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-end">
      <div class="buttons">
        <router-link class="button" to="/posts/new">New post</router-link>
        <button class="button" @click="modal.showModal">Signup</button>
      </div>
    </div>
    <teleport to="#modal" v-if="modal.visible.value">
      <Signup />
    </teleport>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Signup from './Signup.vue';
import { useModal } from '../compositions/useModal';

export default defineComponent({
  components: { Signup },
  setup() {
    return {
      modal: useModal(),
    };
  },
});
</script>
