<script setup lang="ts">
import { toRefs } from 'vue'

import { formatMoney } from '@/utils/helper/formatter'

const props = defineProps({
  title: {
    type: String,
    default: 'Title here'
  },
  value: {
    type: Number,
    default: 0.0
  }
})
</script>

<template>
  <div class="rounded-md bg-primary-light row-btwn p-6">
    <div class="align-col w-10/12">
      <p class="text-grey font-light w-full mb-5">{{ title }}</p>

      <span class="font-semibold text-3xl break-words mt-auto">{{ formatMoney(value) }}</span>

      <!-- <p class="align-row items-center text-sm text-grey font-light mt-2">
        <span><span class="text-green-400 font-semibold">10%</span> decrease vs last month</span>
      </p> -->
    </div>

    <slot name="icon"></slot>
  </div>
</template>
