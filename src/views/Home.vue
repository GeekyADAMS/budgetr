<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, ref, toRefs, type ComputedRef } from 'vue'

import BudgetSurplusIcon from '@/components/icons/BudgetSurplusIcon.vue'
import CalendarGrey from '@/components/icons/CalendarGrey.vue'
import ExpenseIcon from '@/components/icons/ExpenseIcon.vue'
import WalletIcon from '@/components/icons/WalletIcon.vue'
import ArrowButton from '@/components/common/util/ArrowButton.vue'
import MetricCard from '@/components/common/util/cards/MetricCard.vue'
import CreateBudgetModal from '@/components/common/modals/CreateBudget.vue'
import YearlyExpenseGraph from '@/components/expense/YearlyExpenseGraph.vue'

import useDateTime from '@/composables/utils/useDateTime'

import { useBudgetStore } from '@/stores/budget'
import { useExpenseStore } from '@/stores/expense'

import type { MonthlyBudget } from '@/types/budget/budget.interface'

import { stringToCamelCase } from '@/utils/helper/converter'
import useAggregator from '@/composables/utils/useAggregator'

const budgetStore = useBudgetStore()
const expenseStore = useExpenseStore()

const { aggregateTransactionsAmountByMonth } = useAggregator()

const showBudgetModal = ref(false)

const currentDate = ref(new Date())
const { getMonthAndYear } = useDateTime()

const currentMonthYear = ref(getMonthAndYear())

const { budgets } = toRefs(budgetStore)
const { allExpenses } = toRefs(expenseStore)

const currentMonthBudget: ComputedRef<MonthlyBudget | undefined> = computed(() => {
  return budgets.value[stringToCamelCase(currentMonthYear.value)]
})

const createBudgetMode = ref('create')

const totalMonthlyExpenseAmount = ref<{ totalAmount: number }>(
  aggregateTransactionsAmountByMonth(currentDate.value, allExpenses.value)
)

const budgetDeficit = computed(() => {
  const budgetAmount = currentMonthBudget.value ? Number(currentMonthBudget.value?.amount) : 0

  return budgetAmount - totalMonthlyExpenseAmount.value.totalAmount
})

const changeMonth = (value: number) => {
  currentDate.value.setMonth(currentDate.value.getMonth() + value)

  currentMonthYear.value = getMonthAndYear(currentDate.value)

  totalMonthlyExpenseAmount.value = aggregateTransactionsAmountByMonth(
    currentDate.value,
    allExpenses.value
  )
}

const graphYear = ref<number>(new Date().getFullYear())

const createBudget = () => {
  createBudgetMode.value = currentMonthBudget.value ? 'edit' : 'create'

  showBudgetModal.value = true
}
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
          <span class="text-xl font-semibold">{{ currentMonthYear }}</span>

          <div class="align-row items-center ml-5">
            <ArrowButton :style="{ rotate: '180deg' }" @click.prevent="changeMonth(-1)" />

            <ArrowButton class="ml-2" @click.prevent="changeMonth(1)" />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mt-8 align-row gap-x-4">
      <MetricCard
        class="w-3/12"
        title="Total Budget Amount"
        :value="currentMonthBudget ? Number(currentMonthBudget?.amount) : 0"
      >
        <template #icon>
          <WalletIcon />
        </template>
      </MetricCard>

      <MetricCard
        class="w-3/12"
        title="Total Monthly Expenses"
        :value="totalMonthlyExpenseAmount.totalAmount"
      >
        <template #icon>
          <ExpenseIcon />
        </template>
      </MetricCard>

      <MetricCard
        class="w-3/12"
        :class="[budgetDeficit < 0 ? 'text-red-500' : 'text-green-500']"
        :title="`Budget ${budgetDeficit < 0 ? 'Deficit' : 'Surplus'}`"
        :value="Math.abs(budgetDeficit)"
      >
        <template #icon>
          <BudgetSurplusIcon :bg-color="budgetDeficit < 0 ? 'red' : '#36DC0C'" />
        </template>
      </MetricCard>

      <div
        class="pattern-bg centered-col w-3/12 flex flex-grow text-white p-6"
        @click="createBudget"
      >
        <div
          class="press rounded-full w-12 h-12 centered-col bg-dark bg-opacity-30 hover:bg-opacity-70"
        >
          <span class="text-2xl">+</span>
        </div>
        <span class="text-xl font-medium mt-4">{{
          currentMonthBudget ? 'Edit budget' : 'Create Budget'
        }}</span>
      </div>
    </div>

    <div class="mt-16 w-full border p-4" :style="{ height: '50vh' }">
      <div class="align-row items-center mb-12">
        <h3 class="text-2xl font-semibold">
          Distribution of Expense:
          <span class="text-grey font-light ml-3">({{ graphYear }})</span>
        </h3>

        <div class="ml-3 align-col h-12 w-5">
          <ArrowButton class="" :style="{ rotate: '-90deg' }" @click.prevent="graphYear -= 1" />
          <ArrowButton :style="{ rotate: '90deg' }" @click.prevent="graphYear += 1" />
        </div>
      </div>

      <YearlyExpenseGraph :transactions="allExpenses" :year="graphYear" />
    </div>
  </main>

  <CreateBudgetModal
    :is-open="showBudgetModal"
    :month-year="currentMonthYear"
    :mode="createBudgetMode"
    :current-budget="currentMonthBudget"
    @close="showBudgetModal = false"
  />
</template>

<style scoped>
.pattern-bg {
  background: url('@/assets/images/picture/blue-pattern-bg.png') !important;
  background-size: cover;
  /* background-color: red; */
}
</style>
