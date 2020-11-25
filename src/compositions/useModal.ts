import { ref, readonly } from 'vue';

const visible = ref(false);
const component = ref();

export function useModal() {
  return {
    component,
    visible: readonly(visible),
    showModal: function() {
      visible.value = true;
    },
    hideModal: function() {
      visible.value = false;
    },
  };
}
