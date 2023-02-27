<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'

import BudgetSurplusIcon from '@/components/icons/BudgetSurplusIcon.vue'
import CalendarGrey from '@/components/icons/CalendarGrey.vue'
import ExpenseIcon from '@/components/icons/ExpenseIcon.vue'
import WalletIcon from '@/components/icons/WalletIcon.vue'

import ArrowButton from '@/components/common/util/ArrowButton.vue'
import MetricCard from '@/components/common/util/MetricCard.vue'
import CreateBudgetModal from '@/components/common/modals/CreateBudget.vue'

const showBudgetModal = ref(false)
</script>

<template>
  <main class="w-full h-full px-16 pt-12">
    <div class="row-btwn">
      <div class="align-col">
        <h1 class="text-2xl font-semibold">Hello Abdulhakeem 👋</h1>
        <p class="text-grey text-sm font-light">
          Managing your money helps you stay stable financially.
        </p>
      </div>

      <div class="align-col">
        <span class="text-grey font-light">Current Month</span>
        <div class="align-row items-center mt-1">
          <CalendarGrey class="mr-1.5" />
          <span class="text-xl font-semibold">February 2023</span>

          <div class="align-row items-center ml-5">
            <ArrowButton class="rotate-180 animate-none" />

            <ArrowButton class="ml-2" />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mt-8 align-row gap-x-4">
      <MetricCard class="w-3/12">
        <template #icon>
          <WalletIcon />
        </template>
      </MetricCard>

      <MetricCard class="w-3/12">
        <template #icon>
          <ExpenseIcon />
        </template>
      </MetricCard>

      <MetricCard class="w-3/12">
        <template #icon>
          <BudgetSurplusIcon />
        </template>
      </MetricCard>

      <div
        class="pattern-bg centered-col w-3/12 flex flex-grow text-white p-6"
        @click="showBudgetModal = true"
      >
        <div
          class="press rounded-full w-12 h-12 centered-col bg-dark bg-opacity-30 hover:bg-opacity-70"
        >
          <span class="text-2xl">+</span>
        </div>
        <span class="text-xl font-medium mt-4">Create Budget</span>
      </div>
    </div>
  </main>

  <CreateBudgetModal :is-open="showBudgetModal" @close="showBudgetModal = false" />
</template>

<style scoped>
.pattern-bg {
  background: url('@/assets/images/picture/blue-pattern-bg.png') !important;
  background-size: cover;
  /* background-color: red; */
}
</style>
