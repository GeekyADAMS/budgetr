<script setup lang="ts">
import BudgetrLogo from '@/components/icons/BudgetrLogo.vue'
import MainNav from './MainNav.vue'
import ProfilePreview from './ProfilePreview.vue'
</script>

<template>
  <header class="w-full row-btwn border-b border-grey-lighter py-4 px-16">
    <BudgetrLogo />

    <MainNav />

    <ProfilePreview />
  </header>
</template>
