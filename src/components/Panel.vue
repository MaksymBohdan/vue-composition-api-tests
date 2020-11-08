<template>
  <a
    data-test="period"
    :class="{ 'is-active': selectedPeriod === period }"
    @click="$emit('set-period', period)"
    >{{ period }}</a
  >
</template>

<script lang="ts">
import { Period } from '@/types';

import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    period: {
      type: String as () => Period,
      required: true,
    },

    selectedPeriod: {
      type: String as () => Period,
      required: true,
    },
  },
});
</script>

<style></style>
