<template>
  <form class="section" @submit.prevent="submit">
    <FormInput
      type="text"
      name="User name"
      v-model="userName"
      :error="userNameStatus.message"
    />

    <FormInput
      type="password"
      name="Password"
      v-model="password"
      :error="passwordStatus.message"
    />

    <button class="button is-primary" :disabled="!isFormValid">
      Submit
    </button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import FormInput from '@/components/FormInput.vue';
import { Status, length, required, validate } from '../assets/validation';
import { useStore } from '@/store';
import { useModal } from '@/compositions/useModal';
import { User } from '../types';

export default defineComponent({
  name: 'Signup',
  components: {
    FormInput,
  },

  setup() {
    const userName = ref('user name');
    const userNameStatus = computed<Status>(() =>
      validate(userName.value, [length({ min: 5, max: 10 }), required()]),
    );

    const password = ref('password');
    const passwordStatus = computed<Status>(() =>
      validate(password.value, [length({ min: 5, max: 10 }), required()]),
    );

    const isFormValid =
      userNameStatus.value.valid && passwordStatus.value.valid;

    const store = useStore();
    const modal = useModal();

    const submit = async (e: any) => {
      if (!isFormValid) {
        return;
      }

      const user: User = {
        id: -1,
        password: password.value,
        username: userName.value,
      };

      store.createUser(user);
      modal.hideModal();
    };

    return {
      userName,
      userNameStatus,
      password,
      passwordStatus,
      submit,
      isFormValid,
    };
  },
});
</script>

<style scoped>
form {
  background-color: white;
  padding: 15px;
}
</style>
