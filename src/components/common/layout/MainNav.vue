<script setup lang="ts">
import pageRoutes from '@/constants/pageRoutes'
</script>

<template>
  <nav class="align-row items-center h-full">
    <div v-for="(nav, navIndex) in pageRoutes" :key="navIndex" class="">
      <router-link
        :to="nav.path"
        class="pb-7 px-3 border-box"
        active-class="text-primary border-b-2 border-accent"
        >{{ nav.title }}</router-link
      >
    </div>
  </nav>
</template>

<style scoped></style>
