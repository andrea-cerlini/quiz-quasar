<template>
  <q-card class="end-page absolute-center row wrap justify-center">
    <h2 class="msg-end-quiz">Quiz terminato</h2>
    <div>
      <p class="end-msg-wrap">
        Risposte esatte:
        <span
          :class="{ 'new-best': currentPlayerBest === score }"
          :score="score"
          :totalQuestionsNumber="totalQuestionsNumber"
          class="end-msg-correct"
        >
          {{ score + ' su ' + totalQuestionsNumber }}</span
        >
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
    <router-link to="/login" class="restart-button-link">
      <input class="restart-button" to="/login" type="button" value="Restart" />
    </router-link>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useComposable } from 'src/composable/composable';

// import {  } from './models';

export default defineComponent({
  name: 'EndPage',
  setup() {
    useComposable().updateUserDatabase();
    const username = ref(useComposable().username.value);
    const currentPlayerBest = ref(0);
    useComposable().userDatabase.value.forEach((user) => {
      if (user.name === username.value) {
        currentPlayerBest.value = user.bestScore;
      }
    });
    const totalQuestionsNumber = ref(useComposable().questionNumber);
    const score = ref(useComposable().score.value);
    return {
      username,
      currentPlayerBest,
      totalQuestionsNumber,
      score,
    };
  },
});
</script>

<style lang="scss"></style>
