<script setup lang="ts">
import { computed, ref, toRefs, type Prop, type PropType } from 'vue'
import type { SelectOption } from '@/types/common/option.interface'
import type { BudgetCategory } from '@/types/budget/category.interface'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:value', 'change'])

const { id, label, options } = toRefs(props)

const value = ref<unknown>(null)

const isTouched = ref<Boolean>(false)
</script>

<template>
  <div class="form-group align-col w-full">
    <label :for="id" class="align-col focus-within:text-primary">
      <span class="text-left text-sm mb-1.5">{{ label }}</span>
      <select
        v-model="value"
        class="border border-grey-light px-3 py-2 text-dark font-semibold focus:border-primary outline-none"
        :id="id"
        @focusout="isTouched = true"
        @change="emit('change', value)"
      >
        <option value="" disabled>Select budget category</option>

        <option v-for="(option, optionIndex) in options" :key="optionIndex" :value="option">
          {{ option.title }}
        </option>
      </select>
    </label>
    <span v-show="isTouched && !value" class="text-red-300 mt-1.5 text-sm text-left font-light"
      >Please enter valid {{ id }}</span
    >
  </div>
</template>
