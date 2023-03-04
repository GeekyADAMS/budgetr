<script setup lang="ts">
import { computed, toRefs, type PropType } from 'vue'
import { useDateFormat } from '@vueuse/core'

import { formatMoney } from '@/utils/helper/formatter'
import { hexToRgb } from '@/utils/helper/converter'

import { useExpenseStore } from '@/stores/expense'

import type { Expense } from '@/types/expense/expense.interface'
import EditIcon from '../icons/EditIcon.vue'
import TrashIcon from '../icons/TrashIcon.vue'

const props = defineProps({
  expense: {
    type: Object as PropType<Expense>,
    required: true
  }
})

const { expense } = toRefs(props)

const formattedDate = computed(() => {
  return expense.value?.date
    ? useDateFormat(new Date(expense.value?.date), 'DD MMM YYYY', {
        locales: 'en-US'
      })
    : '--'
})
</script>

<template>
  <tr class="w-full mb-4 rounded-sm overflow-x-hidden border text-left">
    <td class="py-4 pl-4">
      <!-- <span class="text-gray">#</span>
      <span class="font-semibold">{{ expense.id }}</span> -->
      <span class="font-semibold">{{ expense.title }}</span>
    </td>

    <td class="py-4">
      <span class="font-normal">{{ formatMoney(Number(expense.amount)) }}</span>
    </td>

    <td class="py-4">
      <div class="align-col">
        <span class="font-normal">{{ formattedDate }}</span>
      </div>
    </td>

    <td class="py-4 text-right">
      <div
        class="p-0.5 px-3 ml-auto w-fit capitalize rounded-sm font-medium text-sm bg-opacity-20"
        :style="{ backgroundColor: hexToRgb(expense.category?.color, 0.2) }"
      >
        <div class="align-row items-center">
          <span :style="{ color: expense.category?.color }" class="text-3xl mr-2">•</span>
          <span>{{ expense.category?.title }}</span>
        </div>
      </div>
    </td>

    <td class="py-4 pr-4 text-right">
      <div class="w-full justify-end text-sm align-row items-center ml-auto">
        <ToolTip
          arrow
          offsetSkid="-20"
          offsetDistance="5"
          :hover="true"
          placement="top"
          content="Edit expense"
        >
          <EditIcon class="mr-4 press" @click.prevent="$emit('edit')" />
        </ToolTip>

        <ToolTip arrow offsetSkid="-20" offsetDistance="5" :hover="true" content="Delete expense">
          <TrashIcon class="press" @click.prevent="$emit('delete')" />
        </ToolTip>
      </div>
    </td>
  </tr>
</template>

<style scoped>
td {
  vertical-align: middle;
}
</style>
