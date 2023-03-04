export default function useDateTime() {
  const getMonthAndYear = (date: Date = new Date()): string => {
    const monthYear = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long'
    })
    return monthYear
  }

  return {
    getMonthAndYear
  }
}
