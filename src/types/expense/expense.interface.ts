import type { BudgetCategory } from '../budget/category.interface'

export interface Expense {
  id: string
  title: string
  amount: number | string
  date: string
  category?: BudgetCategory
}
