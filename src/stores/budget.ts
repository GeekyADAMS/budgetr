import { defineStore } from 'pinia'

import type { Expense } from '@/types/expense/expense.interface'
import type { MonthlyBudget } from '@/types/budget/budget.interface'

export interface State {
  budgets: Map<string, MonthlyBudget>
}

export const useBudgetStore = defineStore('useBudget', {
  state: (): State => ({
    budgets: new Map()
  }),

  persist: {
    storage: localStorage,
    paths: ['budgets']
  },

  actions: {
    addNewExpense(expense: Expense) {
      //
    },
    updateSavedExpense(expense: Expense) {
      //
    },
    getCurrentMonthBudget(monthYear: string): MonthlyBudget | undefined {
      return this.budgets.get(monthYear)
    }
  }
})
