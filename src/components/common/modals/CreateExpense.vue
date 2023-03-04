<script setup lang="ts">
import { computed, onMounted, ref, toRefs, type PropType } from 'vue'

import BaseModal from '../base/BaseModal.vue'
import BaseInput from '../base/BaseInput.vue'
import BaseSelect from '../base/BaseSelect.vue'

import useGenerator from '@/composables/utils/useGenerator'
import { useToast } from 'vue-toastification'

import type { Expense } from '@/types/expense/expense.interface'
import type { BudgetCategory } from '@/types/budget/category.interface'

import { useExpenseStore } from '@/stores/expense'
import { useBudgetCategoryStore } from '@/stores/category'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  selectedExpense: {
    type: Object as PropType<Expense | null>,
    required: true
  },
  mode: {
    type: String,
    default: 'create'
  }
})

const emit = defineEmits(['close'])

const { generateID } = useGenerator()

const toast = useToast()

const categoryStore = useBudgetCategoryStore()
const expenseStore = useExpenseStore()

const { isOpen, selectedExpense, mode } = toRefs(props)

const budgetCategories = categoryStore.allBudgetCategories

const expenseData = selectedExpense.value
  ? ref<Expense>(selectedExpense.value)
  : ref<Expense>({
      id: generateID(),
      title: '',
      amount: '',
      date: '',
      category: undefined
    })

const isFormCompleted = computed(() => {
  const expense = expenseData.value

  return !!(expense.id && expense.title && expense.amount && expense.date && expense.category
    ? Object.keys(expense?.category).length
    : false)
})

const isSavingExpense = ref(false)

const saveExpense = () => {
  isSavingExpense.value = true

  if (mode.value === 'create') {
    expenseStore.addNewExpense(expenseData.value)
    toast.success(`New expense data <${expenseData.value.title}> added!`)
  } else if (mode.value === 'edit') {
    expenseStore.updateSavedExpense(expenseData.value)
    toast.success(`Expense data for <${expenseData.value.title}> updated!`)
  }

  isSavingExpense.value = false
  emit('close')
}

const setExpenseCategory = (val: BudgetCategory) => {
  expenseData.value.category = val
}
</script>

<template>
  <BaseModal :is-open="isOpen" @close="$emit('close')">
    <template #content>
      <div class="p-10 py-8 pb-16 text-center">
        <h1 class="text-2xl font-medium">
          {{ mode === 'create' ? 'Add New Expense' : 'Update Expense Details' }}
        </h1>
        <p class="text-grey font-light text-sm mt-1">Enter details for your spending below</p>

        <form class="mt-10 border border-grey-light rounded-xl p-5 pt-5 py-8">
          <BaseInput
            v-model:value="expenseData.title"
            class="mb-4"
            id="expense-name"
            label="Expense Title"
            max-length="150"
          />

          <BaseInput
            v-model:value="expenseData.amount"
            class="mb-4"
            id="expense-amount"
            label="Expense Amount"
            type="number"
            :min="0"
          />

          <BaseInput
            v-model:value="expenseData.date"
            class="mb-4"
            id="expense-date"
            label="Expense Date"
            type="date"
          />

          <BaseSelect
            :options="budgetCategories"
            id="expense-category"
            label="Expense Category"
            :value="expenseData.category"
            @change="(val) => setExpenseCategory(val)"
          />

          <button
            class="bg-primary text-white w-full mt-3 py-3 text-center press"
            :class="{ disable: !isFormCompleted }"
            :disabled="!isFormCompleted"
            @click.prevent="saveExpense"
          >
            {{
              isSavingExpense
                ? 'Adding category..'
                : mode === 'create'
                ? 'Add Category'
                : 'Save Changes'
            }}
          </button>
        </form>
      </div>
    </template>
  </BaseModal>
</template>
