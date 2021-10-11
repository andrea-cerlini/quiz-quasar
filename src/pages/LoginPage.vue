<template>
  <q-form
    @submit="onSubmit"
    autocomplete="off"
    class="absolute-center bg-50 login-page q-pa-xl"
  >
    <h2 class="text-primary">Login</h2>
    <h4 class="border-radius-inherit light-bg q-pa-sm text-secondary">
      Inserisci il tuo nome
    </h4>
    <q-input
      :label="username === 'vuoto' ? 'Simpaticone...' : 'Inserisci il nome'"
      :rules="[
        (username) =>
          (username != false && username != undefined) ||
          'Il nome non può essere vuoto! ',
      ]"
      autofocus
      lazy-rules
      name="usernameInput"
      standout="bg-secondary text-dark"
      v-model="username"
    />
    <q-btn
      :ripple="{ early: true }"
      class="bg-grey-9 q-ma-md text-secondary"
      type="submit"
      >INIZIA</q-btn
    >
  </q-form>
</template>

<script lang="ts">
import { useQuizDatabase } from 'src/composable/quiz-database-composable';
import { useUsersDatabase } from 'src/composable/users-database-composable';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

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
    const { logged, username } = useUsersDatabase();
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
