<script setup lang="ts">
import { computed, ref, toRefs, type PropType } from 'vue'
import StackedBarchart from '../common/util/charts/StackedBarchart.vue'

import type { StackedGraphSeries } from '@/types/common/graph.interface'

import useAggregator from '@/composables/utils/useAggregator'
import { useExpenseStore } from '@/stores/expense'
import type { Expense } from '@/types/expense/expense.interface'

const props = defineProps({
  transactions: {
    type: Array as PropType<Expense[]>,
    default: () => []
  },
  year: {
    type: Number,
    default: () => new Date().getUTCFullYear()
  }
})

const { aggregateCategoriesTransactionsThroughYear } = useAggregator()

const { transactions, year } = toRefs(props)

const series = computed(() => {
  return aggregateCategoriesTransactionsThroughYear(year.value, transactions.value)
})
</script>

<template>
  <StackedBarchart :series="series" />
</template>
