import type { Expense } from '@/types/expense/expense.interface'

interface Result {
  name: string
  data: number[]
}

export default function useAggregator() {
  const aggregateTransactionsAmountByMonth = (targetDate: Date, transactions: Expense[]) => {
    const targetMonth = targetDate.getMonth()
    let totalAmount = 0

    for (const transaction of transactions) {
      const transactionDate = new Date(transaction.date)
      const transactionMonth = transactionDate.getMonth()

      if (transactionMonth === targetMonth) {
        totalAmount += Number(transaction.amount)
      }
    }

    return { totalAmount }
  }

  const aggregateCategoriesTransactionsThroughYear = (
    selectedYear: number,
    transactions: Expense[]
  ): Result[] => {
    const categories = new Map<string, number[]>()

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const month = date.getMonth()
      const year = date.getFullYear()

      if (selectedYear !== year) return

      const category = String(transaction.category?.title)

      if (!categories.has(category)) {
        categories.set(category, new Array(12).fill(0))
      }

      const data = categories.get(category)!
      data[month] += Number(transaction.amount)
    })

    const result: Result[] = []
    for (const [name, data] of categories.entries()) {
      result.push({ name, data })
    }

    return result
  }

  return {
    aggregateTransactionsAmountByMonth,
    aggregateCategoriesTransactionsThroughYear
  }
}
