<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-end">
      <div class="buttons" v-if="auth">
        <router-link class="button" to="/posts/new">New Post</router-link>
        <button class="button" @click="signout">Signout</button>
      </div>

      <div class="buttons" v-if="!auth">
        <button class="button" @click="signup">Signup</button>
        <button class="button" @click="signin">Signin</button>
      </div>
    </div>
    <teleport to="#modal" v-if="modal.visible.value">
      <component :is="component" />
    </teleport>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, markRaw } from 'vue';
import Signup from './Signup.vue';
import { useModal } from '../compositions/useModal';
import { useStore } from '@/store';

export default defineComponent({
  setup() {
    const modal = useModal();
    const store = useStore();
    const auth = computed(() => store.getState().authors.currentUserId);

    const signin = () => {
      modal.showModal();
      // modal.component.value = markRaw(Signin);
    };

    const signup = () => {
      modal.showModal();
      modal.component.value = markRaw(Signup);
    };

    const signout = () => {
      console.log('sign out');
    };

    return { modal, auth, component: modal.component, signup, signin, signout };
  },
});
</script>
