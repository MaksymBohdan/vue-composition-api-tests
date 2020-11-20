import { ref, readonly } from 'vue';

const visible = ref(false);

export function useModal() {
  return {
    visible: readonly(visible),
    showModal: function() {
      visible.value = true;
    },
    hideModal: function() {
      visible.value = false;
    },
  };
}
