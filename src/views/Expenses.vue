<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'

import CreateExpenseModal from '@/components/common/modals/CreateExpense.vue'
import ExpenseTable from '@/components/expense/ExpenseTable.vue'

import { useToast } from 'vue-toastification'

import { useExpenseStore } from '@/stores/expense'
import type { Expense } from '@/types/expense/expense.interface'

const toast = useToast()
const expenseStore = useExpenseStore()

const allExpenses = expenseStore.allExpenses
const selectedExpense = ref<Expense | null>(null)

const showCreateExpenseModal = ref(false)
const createExpenseMode = ref('create')

const editExpenseHandler = (expense: Expense) => {
  if (expense) {
    createExpenseMode.value = 'edit'
    selectedExpense.value = expense

    showCreateExpenseModal.value = true
  }
}

const deleteExpense = (expense: Expense) => {
  const confirmation = confirm(`Are you sure you want to delete "${expense.title}" expense?`)

  if (confirmation) {
    expenseStore.deleteExpense(expense.id)

    toast.success('Expense deleted successfully!')
  }
}

const closeModal = () => {
  showCreateExpenseModal.value = false

  selectedExpense.value = null
  createExpenseMode.value = 'create'
}
</script>

<template>
  <main class="w-full h-full pt-12">
    <div class="centered-col">
      <h1 class="text-2xl font-medium">Manage Expenses</h1>
      <p class="text-grey font-light text-sm mt-1 text-opacity-75">
        Add and track your everyday spendings
      </p>

      <button
        class="bg-primary text-white w-4/12 py-3 text-center press mt-8"
        @click.prevent="showCreateExpenseModal = true"
      >
        Add Expense
      </button>

      <div class="align-col mt-16 w-8/12">
        <h2 class="text-xl">All Expenses</h2>

        <div class="w-full mt-5 overflow-y-scroll" :style="{ height: '60vh' }">
          <ExpenseTable
            :expenses="allExpenses"
            @edit="(expense) => editExpenseHandler(expense)"
            @delete="(expense) => deleteExpense(expense)"
          />
        </div>
      </div>
    </div>
  </main>

  <CreateExpenseModal
    v-if="showCreateExpenseModal"
    :mode="createExpenseMode"
    :is-open="showCreateExpenseModal"
    :selected-expense="selectedExpense"
    @close="closeModal"
  />
</template>
