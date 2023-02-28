import { defineStore } from 'pinia'

import type { BudgetCategory } from '@/types/budget/category.interface'

export interface State {
  allBudgetCategories: BudgetCategory[]
}

export const useBudgetCategoryStore = defineStore({
  id: 'useBudgetCategory',

  state: (): State => ({
    allBudgetCategories: [
      {
        id: 'HB0001',
        title: 'Housing',
        color: '#A8FF80'
      },
      {
        id: 'FB0002',
        title: 'Food',
        color: '#F7CA87'
      },
      {
        id: 'HC0003',
        title: 'Healthcare',
        color: '#98F3F9'
      }
    ]
  }),

  actions: {
    addBudgetCategory(category: BudgetCategory) {
      this.allBudgetCategories.push(category)
    },
    removeCategory(id: string) {
      const index = this.getCategoryByIndex(id)
      this.allBudgetCategories.splice(index, 1)
    },
    getCategoryByIndex(id: string): number {
      const categoryIndex: number = this.allBudgetCategories.findIndex(
        (item): boolean => item.id === id
      )

      return categoryIndex
    }
  }
})
