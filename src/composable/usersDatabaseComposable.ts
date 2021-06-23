import { ref, Ref } from 'vue';

interface user {
  name: string;
  bestScore: number;
}

const username = ref('');
const logged = ref(false);

const userDatabase = ref<user[]>([]);

function setUsername(name: string) {
  username.value = name;
  logged.value = true;
}

function updateUserDatabase(score: Ref<number>) {
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


export function useUsersDatabase() {
  return {
    logged,
    userDatabase,
    username,
    setUsername,
    updateUserDatabase,
  };
}
