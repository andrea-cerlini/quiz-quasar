<template>
  <q-form
    style="user-select: none"
    class="absolute-center bg-50 q-pa-xl login-page"
    @submit="onSubmit"
    autocomplete="off"
  >
    <h2 class="text-primary">Login</h2>
    <h4 class="text-secondary q-pa-sm light-bg">Inserisci il tuo nome</h4>
    <q-input
      standout="bg-secondary text-dark"
      label="Inserisci il nome"
      name="usernameInput"
      :rules="[(username) => username != '' || 'Il nome non può essere vuoto!']"
      v-model="username"
      lazy-rules
      autofocus
    />
    <q-btn
      class="text-secondary q-ma-md bg-grey-9"
      :ripple="{ early: true }"
      type="submit"
      >INIZIA</q-btn
    >
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useComposable } from 'src/composable/composable';
// import {  } from './models';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    var username = ref('');
    const router = useRouter();

    /*--------------------------- Functions ---------------------------*/
    function onSubmit() {
      useComposable().setUsername(username.value);
      void router.push('quiz');
    }

    return {
      onSubmit,
      showErrorMessage: ref(false),
      username,
    };
  },
});
</script>

<style lang="scss" scoped>
.bg-50 {
  background-color: rgba(240, 240, 240, 0.6);
  border-radius: 10px;
  box-shadow: $shadow-15;
}

.light-bg {
  background-color: rgba(white, 0.4);
  border-radius: 10px;
}
</style>
