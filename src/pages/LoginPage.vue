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
      :label="username === 'vuoto' ? 'Simpaticone' : 'Inserisci il nome'"
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
    const username = ref('');
    const router = useRouter();

    if (
      useComposable().logged.value &&
      useComposable().numberOfAnsweredQuestions.value <
        useComposable().questionNumber
    ) {
      if (
        !confirm(
          'Vuoi davvero tornare indietro? (Non perderai i dati ' +
            'della partita corrente)'
        )
      ) {
        void router.push('quiz');
      }
    }
    useComposable().logged.value = false;

    /*--------------------------- Functions ---------------------------*/
    function onSubmit() {
      if (useComposable().savedSession.value.value) {
        if (username.value === useComposable().savedSession.value.user) {
          var finished =
            useComposable().numberOfAnsweredQuestions.value ===
            useComposable().questionNumber;
          if (
            confirm(
              'Hai una partita ' +
                (finished ? 'terminata' : 'salvata') +
                ' La vuoi ' +
                (finished ? 'guardare' : ' continuare') +
                '?'
            )
          ) {
            useComposable().logged.value = true;
            useComposable().username.value = username.value;
            useComposable().savedSession.value.value = true;
            void router.push('quiz');
          } else {
            if (
              confirm(
                'Vuoi iniziare una nuova partita? (cancel per tornare al login'
              )
            ) {
              void router.push('quiz');
              useComposable().logged.value = true;
              useComposable().savedSession.value.value = true;
              useComposable().username.value = username.value;
              useComposable().reInitializeEverything();
            }
          }
        } else {
          if (
            confirm(
              "C'è un'altro utente con una partita salvata. Vuoi davvero cominciare? (l'altro utente perderà i dati della propria partita"
            )
          ) {
            void router.push('quiz');
            useComposable().logged.value = true;
            useComposable().savedSession.value.value = true;
            useComposable().savedSession.value.user = username.value;
            useComposable().username.value = username.value;
            useComposable().reInitializeEverything();
          }
        }
      } else {
        void router.push('quiz');
        useComposable().logged.value = true;
        useComposable().savedSession.value.value = true;
        useComposable().savedSession.value.user = username.value;
        useComposable().username.value = username.value;
        useComposable().reInitializeEverything();
      }
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
  background-color: rgba(white, 0.3);
  border-radius: 10px;
}
</style>
