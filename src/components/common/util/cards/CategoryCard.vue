<script setup lang="ts">
import { toRefs } from 'vue'

import CategoryIcon from '@/components/icons/CategoryIcon.vue'
import RemoveIcon from '@/components/icons/RemoveIcon.vue'

import type { PropType } from 'vue'
import type { BudgetCategory } from '@/types/budget/category.interface'

const props = defineProps({
  data: {
    type: Object as PropType<BudgetCategory>,
    required: true
  }
})

const { data } = toRefs(props)
</script>

<template>
  <div class="p-3 px-5 border-2 border-grey-light border-opacity-60 rounded-md">
    <div class="row-btwn">
      <CategoryIcon :color="data?.color" bg-color="red" />
      <RemoveIcon class="mt-1 press w-4 h-4" @click="$emit('remove')" />
    </div>

    <p class="mt-4 text-dark text-xl capitalize">{{ data?.title }}</p>
  </div>
</template>
