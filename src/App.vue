<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import HeaderLayout from '@/components/common/layout/MainHeader.vue'
</script>

<template>
  <div class="w-screen h-screen align-col relative text-dark">
    <HeaderLayout class="top-0 sticky" />

    <main class="w-full h-full overflow-y-scroll">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
