<script setup lang="ts">
import { toRefs } from 'vue'

import { formatMoney } from '@/utils/helper/formatter'

const props = defineProps({
  value: {
    type: Number,
    default: 0.0,
    required: true
  }
})

const { value } = toRefs(props)
</script>

<template>
  <div class="rounded-md bg-primary-light row-btwn p-6">
    <div class="align-col">
      <p class="text-grey font-light">Total Budget Amount</p>

      <span class="font-semibold text-4xl mt-8">{{ formatMoney(value) }}</span>

      <p class="align-row items-center text-sm text-grey font-light mt-2">
        <span><span class="text-green-400 font-semibold">10%</span> decrease vs last month</span>
      </p>
    </div>

    <slot name="icon"></slot>
  </div>
</template>
