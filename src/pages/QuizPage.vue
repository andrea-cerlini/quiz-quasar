<template>
  <q-card
    class="quiz-page q-pa-lg absolute-center column wrap justify-start bg-50"
  >
    <h4 class="question-paragraph">
      {{ questionMessage }}
    </h4>
    <div class="answer-container row wrap justify-center">
      <q-btn
        :key="'answer' + index"
        @click="checkAnswerIndex(index)"
        class="answer text-white bg-primary q-pa-xl col-5 q-ma-sm"
        :ripple="{ early: true }"
        v-for="(answer, index) in answers"
      >
        {{ answer }}
      </q-btn>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useComposable } from 'src/composable/composable';
// import {  } from './models';

export default defineComponent({
  name: 'QuizPage',
  setup() {
    const router = useRouter();
    const route = useRoute();

    useComposable().initializeQuestionDatabase();

    useComposable().score.value = 0;
    var currentQuestion = ref(
      Math.trunc(Math.random() * 100) %
        useComposable().currentQuestionDatabase.value.length
    );
    var questionMessage = ref(
      useComposable().currentQuestionDatabase.value[currentQuestion.value]
        .question
    );
    var answers = ref(
      useComposable().currentQuestionDatabase.value[currentQuestion.value]
        .answers
    );
    var numberOfAskedQuestions = ref(1);

    /*--------------------------- Functions ---------------------------*/
    function checkAnswerIndex(indexOfClickedAnswer: number) {
      if (
        indexOfClickedAnswer ==
        useComposable().currentQuestionDatabase.value[currentQuestion.value]
          .indexOfTheCorrectAnswer
      ) {
        useComposable().increaseScore();
      }
      numberOfAskedQuestions.value++;
      useComposable().deleteFromCurrentQuestionDatabase(currentQuestion.value);
      if (numberOfAskedQuestions.value <= useComposable().questionNumber) {
        currentQuestion.value =
          Math.trunc(Math.random() * 100) %
          useComposable().currentQuestionDatabase.value.length;
        questionMessage.value =
          useComposable().currentQuestionDatabase.value[
            currentQuestion.value
          ].question;
        answers.value =
          useComposable().currentQuestionDatabase.value[
            currentQuestion.value
          ].answers;
      } else {
        const redirectPath = route.query.redirect || '/end';
        void router.push(redirectPath.toString());
      }
    }

    return {
      currentQuestion,
      questionMessage,
      answers,
      checkAnswerIndex,
    };
  },
});
</script>

<style lang="scss" scoped>
.bg-50 {
  background-color: rgba(240, 240, 240, 0.6);
  border-radius: 10px;
  box-shadow: $shadow-15;
  user-select: none;
}

.question-paragraph {
  text-align: center;
}
.answer {
  overflow: auto;
}
</style>
