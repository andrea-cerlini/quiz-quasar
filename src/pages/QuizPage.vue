<template>
  <q-card
    class="absolute-center bg-50 column justify-start q-pa-lg quiz-page wrap"
  >
    <h4 class="question-paragraph">
      {{ questionMessage }}
    </h4>
    <div class="answer-container justify-center row wrap">
      <q-btn
        :key="'answer' + index"
        :ripple="{ early: true }"
        @click="checkAnswerIndex(index)"
        class="answer bg-primary col-5 q-ma-sm q-pa-xl text-white"
        v-for="(answer, index) in answers"
      >
        {{ answer }}
      </q-btn>
    </div>
  </q-card>
</template>

<script lang="ts">
import { useQuizDatabase } from 'src/composable/quiz-database-composable';
import { useUsersDatabase } from 'src/composable/users-database-composable';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'QuizPage',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const {
      answers,
      currentQuestion,
      currentQuestionDatabase,
      numberOfAnsweredQuestions,
      numberOfAskedQuestions,
      questionMessage,
      questionNumber,
      score,
      deleteFromCurrentQuestionDatabase,
      increaseScore,
      initializeQuestionDatabase,
    } = useQuizDatabase();
    const 
      { logged } = useUsersDatabase();

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
      answers,
      currentQuestion,
      questionMessage,
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
