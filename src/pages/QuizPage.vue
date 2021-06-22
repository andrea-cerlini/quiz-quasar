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
    const {
      questionNumber,
      numberOfAnsweredQuestions,
      logged,
      increaseScore,
      score,
      questionMessage,
      answers,
      numberOfAskedQuestions,
      currentQuestionDatabase,
      initializeQuestionDatabase,
      deleteFromCurrentQuestionDatabase,
      currentQuestion,
    } = useComposable();

    if (logged.value && numberOfAskedQuestions.value === 0) {
      initializeQuestionDatabase();

      score.value = 0;
      currentQuestion.value =
        Math.trunc(Math.random() * 100) % currentQuestionDatabase.value.length;
      questionMessage.value =
        currentQuestionDatabase.value[currentQuestion.value].question;
      answers.value =
        currentQuestionDatabase.value[currentQuestion.value].answers;
      numberOfAskedQuestions.value = 1;
    } else if (
      numberOfAnsweredQuestions.value === questionNumber &&
      logged.value
    ) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push({ name: 'EndPage' });
    }

    /*--------------------------- Functions ---------------------------*/
    function checkAnswerIndex(indexOfClickedAnswer: number) {
      if (
        indexOfClickedAnswer ==
        currentQuestionDatabase.value[currentQuestion.value]
          .indexOfTheCorrectAnswer
      ) {
        increaseScore();
      }
      numberOfAnsweredQuestions.value++;
      deleteFromCurrentQuestionDatabase(currentQuestion.value);
      if (numberOfAskedQuestions.value < questionNumber) {
        currentQuestion.value =
          Math.trunc(Math.random() * 100) %
          currentQuestionDatabase.value.length;
        questionMessage.value =
          currentQuestionDatabase.value[currentQuestion.value].question;
        answers.value =
          currentQuestionDatabase.value[currentQuestion.value].answers;
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
