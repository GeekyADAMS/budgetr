<script setup lang="ts">
import { toRefs, type PropType } from 'vue'

import ExpenseCard from './ExpenseCard.vue'

import type { Expense } from '@/types/expense/expense.interface'

const props = defineProps({
  expenses: {
    type: Array as PropType<Expense[]>,
    required: true,
    default: () => []
  }
})

const { expenses } = toRefs(props)
</script>

<template>
  <table v-if="expenses.length" class="w-full px-2">
    <colgroup>
      <col span="1" style="width: 35%" />
      <col span="1" style="width: 20%" />
      <col span="1" style="width: 15%" />
      <col span="1" style="width: 20%" />
      <col span="1" style="width: 15%" />
    </colgroup>

    <thead class="w-full bg-primary-light py-2 mt-32 text-left">
      <tr class="w-full mb-4 rounded-sm overflow-x-hidden border text-left">
        <th class="pl-4">Transaction Title</th>
        <th>Amount</th>
        <th>Date</th>
        <th class="text-right">Category</th>
        <th class="text-right pr-4">Actions</th>
      </tr>
    </thead>

    <tbody class="w-full">
      <ExpenseCard
        v-for="(expense, expenseIndex) in expenses"
        :key="expenseIndex"
        :expense="expense"
        class="expense-card clickable"
        @edit="$emit('edit', expense)"
        @delete="$emit('delete', expense)"
      />
    </tbody>
  </table>
</template>

<style scoped>
table {
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0 12px;
}

.expense-card {
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow-x: hidden;
}

th {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
