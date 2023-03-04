import { defineStore } from 'pinia'

import type { BudgetCategory } from '@/types/budget/category.interface'

export interface State {
  allBudgetCategories: BudgetCategory[]
}

export const useBudgetCategoryStore = defineStore('useBudgetCategory', {
  state: (): State => ({
    allBudgetCategories: [
      {
        id: 'HB0001',
        title: 'Housing',
        color: '#A8FF80'
      },
      {
        id: 'FB0001',
        title: 'Food',
        color: '#F7CA87'
      },
      {
        id: 'HC0001',
        title: 'Healthcare',
        color: '#98F3F9'
      }
    ]
  }),

  persist: {
    storage: localStorage,
    paths: ['allBudgetCategories']
  },

  actions: {
    addBudgetCategory(category: BudgetCategory) {
      for (let i = 0; i < this.allBudgetCategories.length; i++) {
        if (
          this.allBudgetCategories[i].id === category.id ||
          this.allBudgetCategories[i].title.toLowerCase() === category.title.toLowerCase()
        ) {
          return 'Budget category already exists!'
        }
      }
      this.allBudgetCategories.push(category)
      return null
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
