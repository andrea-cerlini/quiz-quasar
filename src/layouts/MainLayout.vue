<template>
  <q-layout view="lHh Lpr lFf" :class="'bg-image-' + currentBgClass">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useComposable } from 'src/composable/composable';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const route = useRoute();
    const router = useRouter();
    var routeNow = ref(route);
    checkRedirect(routeNow.value.path); // Initial check, in case of user reload of the page

    watch(
      // Second check in case of user navigation between the pages, which resets the data upon reload
      () => routeNow.value.path,
      (pathNew) => checkRedirect(pathNew)
    );
    var currentBgClass = computed(() => {
      switch (routeNow.value.path) {
        case '/login':
        case '/':
          return 'login';
        case '/quiz':
          return 'quiz';
        case '/end':
          return 'end';
        default:
          return '';
      }
    });

    /* -------------------- Functions -------------------- */
    function checkRedirect(path: string) {
      if (path === '/quiz' || path === '/end') {
          if (!useComposable().logged.value) {
            alert('Accesso negato: non sei loggato');
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            router.push({ name: 'LoginPage' });
          }
      }
    }

    return {
      currentBgClass,
      routeNow,
    };
  },
});
</script>

<style scoped lang="scss">
$border-radius-default: 10px;

.bg-50 {
  background-color: rgba($grey-3, 0.6);
  border-radius: $border-radius-default;
  box-shadow: $shadow-15;
}

.bg-image {
  &-login {
    background-image: url('../assets/BgLogin.png');
    background-size: cover;
    image-rendering: pixelated;
  }

  &-quiz {
    background-image: url('../assets/BgQuiz.png');
    background-size: cover;
    image-rendering: pixelated;
  }

  &-end {
    background-image: url('../assets/BgEnd.png');
    background-size: cover;
    image-rendering: pixelated;
  }
}
</style>
