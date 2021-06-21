<template>
  <q-card
    class="end-page absolute-center column wrap justify-center q-pa-lg bg-50"
  >
    <h2 class="msg-end-quiz">Quiz terminato</h2>
    <div class="score-board">
      <p class="end-msg-wrap">
        Risposte esatte:
        <span
          :class="{ 'new-best': currentPlayerBest === score }"
          :score="score"
          :totalQuestionsNumber="totalQuestionsNumber"
          class="end-msg-correct"
        >
          {{ score + ' su ' + totalQuestionsNumber }}
        </span>
        <span
          class="new-best end-msg-correct"
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
          class="end-msg-percent"
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
          class="end-msg-best"
        >
          {{ currentPlayerBest + ' su ' + totalQuestionsNumber }}
        </span>
      </p>
    </div>
    <q-btn
      class="restart-button text-secondary q-ma-md bg-grey-9"
      @click="restartFunc"
      :ripple="{ early: true }"
      >RESTART</q-btn
    >
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useComposable } from 'src/composable/composable';
import { useRouter } from 'vue-router';

// import {  } from './models';

export default defineComponent({
  name: 'EndPage',
  setup() {
    const router = useRouter();

    useComposable().updateUserDatabase();
    const username = ref(useComposable().username.value);
    const currentPlayerBest = ref(0);
    useComposable().userDatabase.value.forEach((user) => {
      // Inizializzazione bestScore
      if (user.name === username.value) {
        currentPlayerBest.value = user.bestScore;
      }
    });
    const totalQuestionsNumber = ref(useComposable().questionNumber);
    const score = ref(useComposable().score.value);

    /*--------------------------- Functions ---------------------------*/
    function restartFunc() {
      void router.push('login');
    }

    return {
      username,
      currentPlayerBest,
      totalQuestionsNumber,
      score,
      restartFunc,
    };
  },
});
</script>

<style lang="scss" scoped>
@import 'src/css/app.scss';
.bg-50 {
  background-color: rgba(240, 240, 240, 0.6);
  border-radius: 10px;
  box-shadow: $shadow-15;
}

.msg-end-quiz {
  color: $primary;
  text-align: center;
  user-select: none;
}

.score-board {
  font-size: 16px;
}

.end-msg {
  &-correct {
    font-weight: $font-weight-thin;
  }

  &-percent {
    font-weight: $font-weight-thin;
  }

  &-best-name {
    color: $primary;
  }

  &-best {
    font-weight: $font-weight-thin;
  }
}

.new-best {
  color: desaturate(darken($positive, 15%), 40);
}
</style>
