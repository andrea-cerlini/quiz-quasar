<template>
  <div
    class="fullscreen bg-green text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">Bruh</div>
      <div class="text-h1" style="opacity: 0.6; font-size: 20px">
        C'est le <i style="color: #fcc">Error 404</i>
      </div>

      <div class="text-h2" style="opacity: 0.4">wyd here dummy,,..,,.,,,,</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="red"
        elevated
        to="/"
        label="ur dum :)"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Error404',
});
</script>
