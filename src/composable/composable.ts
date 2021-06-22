import { ref } from 'vue';

interface user {
  name: string;
  bestScore: number;
}

interface question {
  question: string;
  answers: string[];
  indexOfTheCorrectAnswer: number;
}

const questionNumber = 10;

const username = ref('');
const logged = ref(false);
const savedSession = ref({ value: false, user: '' });
const score = ref(0);

const questionDatabase: question[] = [
  // Array con tutte le domande, le risposte e il numero di quella giusta
  {
    question: 'Che anno viene dopo il 2020?', // Prima question
    answers: ['2200', '-3', 'tabasco', '2021'], // Risposte disponibili
    indexOfTheCorrectAnswer: 3, // Indice della risposta giusta
  },
  {
    question: "Quanto potassio c'e' in una banana?",
    answers: [
      'Meno infinito',
      'In media circa il 9%',
      'Esattamente 4 chilometri',
      "Le banane sono in realta' radioattive",
    ],
    indexOfTheCorrectAnswer: 1,
  },
  {
    question: "Ludwig Van Beethoven e' ancora vivo?",
    answers: [
      "No, e' tipo morto due secoli fa",
      'Certo =)',
      "E' morto stamattina",
      'Si, ma non per molto',
    ],
    indexOfTheCorrectAnswer: 0,
  },
  {
    question: 'Che forma ha il display di un televisore standard?',
    answers: ['Verde', 'Icosaedro tronco', 'Triangolo', 'Rettangolo'],
    indexOfTheCorrectAnswer: 3,
  },
  {
    question: 'Vero o falso? Gli umani respirano aria',
    answers: ['Vero', 'Falso'],
    indexOfTheCorrectAnswer: 0,
  },
  {
    question:
      "Quale di queste opzioni e' il nome di un giorno della settimana?",
    answers: ['Ginevro', '42', 'Sabato', 'Domanica'],
    indexOfTheCorrectAnswer: 2,
  },
  {
    question: "Vero o falso? Il sole non e' luminoso",
    answers: ['Vero', 'Falso'],
    indexOfTheCorrectAnswer: 1,
  },
  {
    question: 'Quanto fa 1+1 (nella matematica classica)?',
    answers: [
      'Mille',
      "La matematica e' sopravvalutata",
      '2',
      'Radice cubica di e',
    ],
    indexOfTheCorrectAnswer: 2,
  },
  {
    question: 'Domanda',
    answers: [
      'Risposta sbagliata',
      'Risposta giusta',
      'Risposta sbagliata',
      'Risposta non non sbagliata',
    ],
    indexOfTheCorrectAnswer: 1,
  },
  {
    question: 'Di che colore sono le arance?',
    answers: ['Nero', 'Grillotalpa', 'Giallo', 'Arancione'],
    indexOfTheCorrectAnswer: 3,
  },
  {
    question: "Quante 'C' ci sono nella parola CIAO?",
    answers: ['Una sola', 'Cento', 'Fotosintesi clorofilliana', 'Zero'],
    indexOfTheCorrectAnswer: 0,
  },
  {
    question: 'In che Stato si trova Roma?',
    answers: ['Quattro', 'Repubblica di Venezia', 'Italia', 'Roma non esiste'],
    indexOfTheCorrectAnswer: 2,
  },
  {
    question: 'Vero o falso? Un chilo di cipolle pesa un chilo',
    answers: ['Falso', 'Vero'],
    indexOfTheCorrectAnswer: 1,
  },
  {
    question: 'Che forma hanno gli occhi umani?',
    answers: [
      'Piramidale',
      'Scarsa, non hanno muscoli',
      'Cubica',
      'Sferica, approssimativamente',
    ],
    indexOfTheCorrectAnswer: 3,
  },
  {
    question: "Vero o falso? Il monte Everest e' piu' alto di un uomo",
    answers: ['Vero', 'Falso', 'No', 'Aceto'],
    indexOfTheCorrectAnswer: 0,
  },
];

const currentQuestionDatabase = ref<question[]>([]);

initializeQuestionDatabase();

const currentQuestion = ref(0);
const questionMessage = ref('');
const answers = ref<string[]>([]);
const numberOfAskedQuestions = ref(0);
const numberOfAnsweredQuestions = ref(0);

const userDatabase = ref<user[]>([]);

function setUsername(name: string) {
  username.value = name;
  logged.value = true;
}

function increaseScore() {
  score.value++;
}

function deleteFromCurrentQuestionDatabase(position: number) {
  currentQuestionDatabase.value.splice(position, 1);
}

function reInitializeEverything() {
  score.value = 0;
  numberOfAskedQuestions.value = 0;
  numberOfAnsweredQuestions.value = 0;
  initializeQuestionDatabase();
  currentQuestion.value =
    Math.trunc(Math.random() * 100) % currentQuestionDatabase.value.length;
}

function updateUserDatabase() {
  const found = ref(false);
  userDatabase.value.forEach((user) => {
    if (user.name === username.value) {
      if (score.value > user.bestScore) {
        user.bestScore = score.value;
      }
      found.value = true;
    }
  });
  if (!found.value) {
    userDatabase.value.push({ name: username.value, bestScore: score.value });
  }
}

function initializeQuestionDatabase() {
  questionDatabase.forEach((question, index) => {
    currentQuestionDatabase.value[index] = question;
  });
}

export function useComposable() {
  return {
    answers,
    currentQuestion,
    currentQuestionDatabase,
    logged,
    numberOfAnsweredQuestions,
    numberOfAskedQuestions,
    questionDatabase,
    questionMessage,
    questionNumber,
    savedSession,
    score,
    userDatabase,
    username,
    deleteFromCurrentQuestionDatabase,
    increaseScore,
    initializeQuestionDatabase,
    reInitializeEverything,
    setUsername,
    updateUserDatabase,
  };
}
