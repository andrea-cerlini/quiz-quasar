<template>
  <q-layout view="lHh Lpr lFf" v-bind:class="'bg-image-' + currentBgClass">
    <q-page-container>
      <router-view />
      <!-- <div>{{ routeNow.path }}</div> -->
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
    watch(
      () => routeNow.value.path,
      () => {
        switch (routeNow.value.path) {
          case '/quiz':
          case '/end':
            if (useComposable().username.value === '') {
              alert('Accesso negato: inserire un nome!');
              void router.push('login');
            }
        }
      }
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
    return {
      currentBgClass,
      routeNow,
    };
  },
});
</script>

<style scoped lang="scss">
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
