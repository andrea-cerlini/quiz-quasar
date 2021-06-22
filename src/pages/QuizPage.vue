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
import { defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useComposable } from 'src/composable/composable';

export default defineComponent({
  name: 'QuizPage',
  setup() {
    const router = useRouter();
    const route = useRoute();
    var currentQuestion = useComposable().currentQuestion;
    var questionMessage = useComposable().questionMessage;
    var answers = useComposable().answers;
    var numberOfAskedQuestions = useComposable().numberOfAskedQuestions;

    if (useComposable().logged.value && numberOfAskedQuestions.value === 0) {
      useComposable().initializeQuestionDatabase();

      useComposable().score.value = 0;
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
      numberOfAskedQuestions.value = 1;
    } else if (
      useComposable().numberOfAnsweredQuestions.value ===
        useComposable().questionNumber &&
      useComposable().logged.value
    ) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push({ name: 'EndPage' });
    }

    /*--------------------------- Functions ---------------------------*/
    function checkAnswerIndex(indexOfClickedAnswer: number) {
      if (
        indexOfClickedAnswer ==
        useComposable().currentQuestionDatabase.value[currentQuestion.value]
          .indexOfTheCorrectAnswer
      ) {
        useComposable().increaseScore();
      }
      useComposable().numberOfAnsweredQuestions.value++;
      useComposable().deleteFromCurrentQuestionDatabase(currentQuestion.value);
      if (
        useComposable().numberOfAskedQuestions.value <
        useComposable().questionNumber
      ) {
        useComposable().currentQuestion.value =
          Math.trunc(Math.random() * 100) %
          useComposable().currentQuestionDatabase.value.length;
        useComposable().questionMessage.value =
          useComposable().currentQuestionDatabase.value[
            useComposable().currentQuestion.value
          ].question;
        useComposable().answers.value =
          useComposable().currentQuestionDatabase.value[
            currentQuestion.value
          ].answers;
        numberOfAskedQuestions.value++;
      } else {
        const redirectPath = route.query.redirect || '/end';
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push(redirectPath.toString());
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
.quiz-page {
  user-select: none;
}
.question-paragraph {
  text-align: center;
}
.answer {
  overflow: auto;
}
</style>
