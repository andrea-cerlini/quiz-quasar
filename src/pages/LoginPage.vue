<template>
  <q-form
    class="absolute-center bg-50 q-pa-xl login-page"
    @submit="onSubmit"
    autocomplete="off"
  >
    <h2 class="text-primary">Login</h2>
    <h4 class="text-secondary q-pa-sm light-bg border-radius-inherit">Inserisci il tuo nome</h4>
    <q-input
      standout="bg-secondary text-dark"
      :label="username === 'vuoto' ? 'Simpaticone...' : 'Inserisci il nome'"
      name="usernameInput"
      :rules="[
        (username) =>
          (username != false && username != undefined) ||
          'Il nome non può essere vuoto! ',
      ]"
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
import { useQuizDatabase } from 'src/composable/quizDatabaseComposable';
import { useUsersDatabase } from 'src/composable/usersDatabaseComposable';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const router = useRouter();
    const {
      numberOfAnsweredQuestions,
      questionNumber,
      savedSession,
      reInitializeEverything,
    } = useQuizDatabase();
    const {
      logged,
      username,
    } = useUsersDatabase();
    username.value = '';
    if (logged.value && numberOfAnsweredQuestions.value < questionNumber) {
      if (
        !confirm(
          'Vuoi davvero tornare indietro? (Non perderai i dati ' +
            'della partita corrente)'
        )
      ) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push({ name: 'QuizPage' });
      } else {
        logged.value = false;
      }
    }

    /*--------------------------- Functions ---------------------------*/
    function onSubmit() {
      if (savedSession.value.value) {
        if (username.value === savedSession.value.user) {
          var finished = numberOfAnsweredQuestions.value === questionNumber;
          if (
            confirm(
              'Hai una partita ' +
                (finished ? 'terminata' : 'salvata') +
                '. La vuoi ' +
                (finished ? 'guardare' : 'continuare') +
                '?'
            )
          ) {
            logged.value = true;
            savedSession.value.value = true;
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            router.push({ name: 'QuizPage' });
          } else {
            if (
              confirm(
                'Vuoi iniziare una nuova partita? (cancel per tornare al login'
              )
            ) {
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              router.push({ name: 'QuizPage' });
              logged.value = true;
              savedSession.value.value = true;
              reInitializeEverything();
            }
          }
        } else {
          if (
            confirm(
              "C'è un'altro utente con una partita salvata. Vuoi davvero cominciare? (l'altro utente perderà i dati della propria partita"
            )
          ) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            router.push({ name: 'QuizPage' });
            logged.value = true;
            savedSession.value.value = true;
            savedSession.value.user = username.value;
            reInitializeEverything();
          }
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push({ name: 'QuizPage' });
        logged.value = true;
        savedSession.value.value = true;
        savedSession.value.user = username.value;
        reInitializeEverything();
      }
    }

    return {
      username,
      showErrorMessage: ref(false),
      onSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-page {
  user-select: none;
}
.light-bg {
  background-color: rgba(white, 0.3);
}
</style>
