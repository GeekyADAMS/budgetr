<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import HeaderLayout from '@common/layout/MainHeader.vue'
</script>

<template>
  <div class="w-screen h-screen align-col relative text-dark">
    <HeaderLayout />

    <main class="w-full h-full">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
