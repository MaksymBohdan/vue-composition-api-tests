<template>
  <div class="modal" :style="style">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div id="modal"></div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="modal.hideModal"
    ></button>
  </div>

  <section class="section">
    <div class="container">
      <NavBar />
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue';
import { useModal } from './compositions/useModal';
import { provideStore } from './store';

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
  },

  setup() {
    provideStore();
    const modal = useModal();
    const style = computed(() => ({
      display: modal.visible.value ? 'block' : 'none',
    }));

    return { modal, style };
  },
});
</script>
