<script setup lang="ts">
import { ref, toRefs } from 'vue'

import BaseModal from '../base/BaseModal.vue'
import BaseInput from '../base/BaseInput.vue'

import useGenerator from '@/composables/utils/useGenerator'

import type { BudgetCategory } from '@/types/budget/category.interface'

import { useBudgetCategoryStore } from '@/stores/categories'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const { generateCategoryID } = useGenerator()

const categoryStore = useBudgetCategoryStore()

const { isOpen } = toRefs(props)

const categoryName = ref('')
const categoryColor = ref('')

const isAddingCategory = ref(false)

const createCategory = () => {
  isAddingCategory.value = true

  const newCategory: BudgetCategory = {
    id: generateCategoryID(),
    title: categoryName.value,
    color: categoryColor.value
  }

  console.log(newCategory)

  categoryStore.addBudgetCategory(newCategory)

  isAddingCategory.value = false
  emit('close')
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
            v-model:value="categoryName"
            class="mb-4"
            id="expense-category"
            label="Category Name"
            max-length="20"
          />

          <div class="align-row items-center">
            <BaseInput
              v-model:value="categoryColor"
              class="mb-5 cursor-pointer w-fit"
              id="category-color"
              type="color"
              label="Pick Color"
            />

            <label
              for="category-color"
              class="w-16 h-7 ml-3 mt-2 border rounded-md cursor-pointer"
              :style="{ backgroundColor: categoryColor }"
            >
            </label>
          </div>

          <button
            class="bg-primary text-white w-full mt-3 py-3 text-center press"
            @click.prevent="createCategory"
          >
            {{ isAddingCategory ? 'Adding category..' : 'Add Category' }}
          </button>
        </form>
      </div>
    </template>
  </BaseModal>
</template>
