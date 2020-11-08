<template>
  <section class="section">
    <div class="container">
      <Timeline />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Timeline from '@/components/Timeline.vue';

export default defineComponent({
  name: 'App',
  components: { Timeline },
});
</script>

<style></style>
