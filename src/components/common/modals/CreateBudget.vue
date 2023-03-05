<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'

import BaseModal from '../base/BaseModal.vue'
import BaseInput from '../base/BaseInput.vue'

import { useToast } from 'vue-toastification'

import type { MonthlyBudget } from '@/types/budget/budget.interface'

import { useBudgetStore } from '@/stores/budget'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  monthYear: {
    type: String,
    reqired: true,
    default: ''
  }
})

const emit = defineEmits(['close'])

const toast = useToast()

const { isOpen, monthYear } = toRefs(props)

const budgetStore = useBudgetStore()

const budgetData = ref<MonthlyBudget>({
  title: '',
  amount: 0
})

const isFormCompleted = computed(() => {
  const budget = budgetData.value

  return !!budget.amount
})

const isSavingBudget = ref(false)

const saveMonthlyBudget = () => {
  isSavingBudget.value = true

  budgetStore.saveMonthlyBudget(monthYear.value, budgetData.value)
  toast.success(`Budget data for this month updated!`)

  console.log('Here is budget', budgetStore.budgets)

  isSavingBudget.value = false
  resetForm()
  emit('close')
}

const resetForm = () => {
  budgetData.value = {
    title: '',
    amount: 0
  }
}
</script>

<template>
  <BaseModal :is-open="isOpen" @close="$emit('close')">
    <template #content>
      <div class="p-10 py-8 pb-16 text-center">
        <h1 class="text-2xl font-medium">Create Budget</h1>
        <p class="text-grey font-light text-sm mt-1">Enter budget details for the current month</p>

        <form class="mt-10 border border-grey-light rounded-xl p-5 pt-5 py-8">
          <BaseInput
            v-model:value="budgetData.title"
            class="mb-4"
            id="budget-name"
            label="Budget Name"
            max-length="100"
            :required="false"
          />
          <BaseInput
            v-model:value="budgetData.amount"
            class="mb-5"
            id="budget-amount"
            type="number"
            label="Budget Amount"
            :min="0"
            :required="true"
          />
          <button
            class="bg-primary text-white w-full py-3 text-center press"
            :class="{ disable: !isFormCompleted }"
            :disabled="!isFormCompleted"
            @click.prevent="saveMonthlyBudget"
          >
            {{ isSavingBudget ? 'Saving budget...' : 'Save Budget' }}
          </button>
        </form>
      </div>
    </template>
  </BaseModal>
</template>
