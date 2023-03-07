<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, ref } from 'vue'

import CreateExpenseModal from '@/components/common/modals/CreateExpense.vue'
import ExpenseTable from '@/components/expense/ExpenseTable.vue'
import BaseInput from '@/components/common/base/BaseInput.vue'
import BaseSelect from '@/components/common/base/BaseSelect.vue'

import { useToast } from 'vue-toastification'

import { useExpenseStore } from '@/stores/expense'
import { useBudgetCategoryStore } from '@/stores/category'

import type { Expense } from '@/types/expense/expense.interface'

const toast = useToast()
const expenseStore = useExpenseStore()
const categoryStore = useBudgetCategoryStore()

const allExpenses = expenseStore.allExpenses
const selectedExpense = ref<Expense | null>(null)

const searchTerm = ref('')

const filteredExpense = computed(() => {
  const expenses = allExpenses

  return expenses.filter(
    (expense) =>
      expense.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      expense.category?.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const categories = categoryStore.allBudgetCategories

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

console.log('Transactions: ', allExpenses[0])
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
        <div class="row-btwn w-full">
          <h2 class="text-xl">All Expenses</h2>

          <div class="align-row w-80 items-center">
            <BaseInput
              v-model:value="searchTerm"
              class="rounded-md"
              id="expense-search"
              placeholder="Search expense by name/category"
              type="search"
            />
          </div>
        </div>

        <div class="w-full mt-5 overflow-y-scroll" :style="{ height: '60vh' }">
          <ExpenseTable
            :expenses="filteredExpense"
            @edit="(expense) => editExpenseHandler(expense)"
            @delete="(expense) => deleteExpense(expense)"
          />

          <p v-show="!filteredExpense.length" class="mt-16 text-center text-accent font-bold">
            No expense available
          </p>
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
