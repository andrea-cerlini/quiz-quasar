<template>
  <div
    class="
      fullscreen
      bg-light-blue-2
      text-dark text-center
      q-pa-md
      flex flex-center
      error404-page
    "
  >
    <div>
      <div style="font-size: 30vh">Error 404</div>

      <div class="text-h2" style="opacity: 0.4">Bruh</div>

      <q-btn
        class="text-secondary q-ma-md bg-grey-9"
        :ripple="{ early: true }"
        @click="onGoBack"
        >Go back</q-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Error404',
  setup() {
    const router = useRouter();
    function onGoBack() {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push({ name: 'LoginPage' });
    }
    return {
      onGoBack,
    };
  },
});
</script>

<style scoped>
.error404-page {
  user-select: none;
}
</style>
