import { defineStore } from 'pinia'

import type { Expense } from '@/types/expense/expense.interface'

export interface State {
  allExpenses: Expense[]
}

export const useExpenseStore = defineStore('useExpense', {
  state: (): State => ({
    allExpenses: []
  }),

  persist: {
    storage: localStorage,
    paths: ['allExpenses']
  },

  actions: {
    addNewExpense(expense: Expense) {
      this.allExpenses.unshift(expense)
    },
    updateSavedExpense(expense: Expense) {
      const expenseIndex = this.getExpenseByIndex(expense.id)

      this.allExpenses[expenseIndex] = expense
    },
    deleteExpense(id: string) {
      const index = this.getExpenseByIndex(id)
      this.allExpenses.splice(index, 1)
    },
    getExpenseByIndex(id: string): number {
      const expenseIndex: number = this.allExpenses.findIndex((item): boolean => item.id === id)

      return expenseIndex
    }
  }
})
