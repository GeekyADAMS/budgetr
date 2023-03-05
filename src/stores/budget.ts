import { defineStore } from 'pinia'

import type { MonthlyBudget } from '@/types/budget/budget.interface'

import { stringToCamelCase } from '@/utils/helper/converter'

type AllBudgets = {
  [key: string]: MonthlyBudget
}
export interface State {
  budgets: AllBudgets
}

export const useBudgetStore = defineStore('useBudget', {
  state: (): State => ({
    budgets: {}
  }),

  persist: {
    storage: localStorage,
    paths: ['budgets']
  },

  actions: {
    saveMonthlyBudget(monthYear: string, budget: MonthlyBudget) {
      this.budgets[stringToCamelCase(monthYear)] = budget
    },
    getCurrentMonthBudget(monthYear: string): MonthlyBudget | undefined {
      const budget = this.budgets[monthYear]
      return budget
    }
  }
})
