<template>
  <q-card
    class="absolute-center bg-50 column end-page justify-center q-pa-lg wrap"
  >
    <h2 class="msg-end-quiz">Quiz terminato</h2>
    <div class="score-board text-body2">
      <p class="end-msg-wrap">
        Risposte esatte:
        <span
          :class="{ 'new-best': currentPlayerBest === score }"
          :score="score"
          :totalQuestionsNumber="totalQuestionsNumber"
          class="end-msg-correct text-weight-light"
        >
          {{ score + ' su ' + totalQuestionsNumber }}
        </span>
        <span
          class="end-msg-correct new-best text-weight-light"
          v-if="currentPlayerBest === score"
        >
          - miglior punteggio! :D</span
        >
      </p>
      <p class="end-msg-percent-wrap">
        Percentuale risposte esatte:
        <span
          :score="score"
          :totalQuestionsNumber="totalQuestionsNumber"
          class="end-msg-percent text-weight-light"
        >
          {{ (100 * score) / totalQuestionsNumber + '%' }}
        </span>
      </p>
      <p class="end-msg-best-wrap">
        Migliore punteggio di
        <span :username="username" class="end-msg-best-name">
          {{ username }}</span
        >:
        <span
          :class="{ 'new-best': currentPlayerBest === score }"
          :currentPlayerBest="currentPlayerBest"
          :totalQuestionsNumber="totalQuestionsNumber"
          class="end-msg-best text-weight-light"
        >
          {{ currentPlayerBest + ' su ' + totalQuestionsNumber }}
        </span>
      </p>
    </div>
    <q-btn
      class="bg-grey-9 q-ma-md restart-button text-secondary"
      @click="restartGame"
      :ripple="{ early: true }"
    >
      <q-tooltip>Se riparti, perderai i dati di questa partita</q-tooltip
      >Restart</q-btn
    >
  </q-card>
</template>

<script lang="ts">
import { useQuizDatabase } from 'src/composable/quiz-database-composable';
import { useUsersDatabase } from 'src/composable/users-database-composable';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'EndPage',
  setup() {
    const router = useRouter();
    const {
      numberOfAnsweredQuestions,
      questionNumber,
      savedSession,
      score,
    } = useQuizDatabase();
     const {
      logged,
      userDatabase,
      username,
      updateUserDatabase,
     } = useUsersDatabase();

    if (logged.value && numberOfAnsweredQuestions.value < questionNumber) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push({ name: 'QuizPage' });
    }
    updateUserDatabase(score);
    const currentPlayerBest = ref(0);
    userDatabase.value.forEach((user) => {
      // Initialization bestScore
      if (user.name === username.value) {
        currentPlayerBest.value = user.bestScore;
      }
    });
    const totalQuestionsNumber = ref(questionNumber);

    /*--------------------------- Functions ---------------------------*/
    function restartGame() {
      logged.value = false;
      logged.value = false;
      savedSession.value.value = false;
      savedSession.value.user = '';
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push({ name: 'LoginPage' });
    }

    return {
      currentPlayerBest,
      score,
      totalQuestionsNumber,
      username,
      restartGame,
    };
  },
});
</script>

<style lang="scss" scoped>
.msg-end-quiz {
  color: $primary;
  text-align: center;
  user-select: none;
}

.end-msg {
  &-best-name {
    color: $primary;
  }
}

.new-best {
  color: desaturate(darken($positive, 15%), 40);
}
</style>
