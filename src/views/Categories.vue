<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'

import CreateCategoryModal from '@/components/common/modals/CreateCategory.vue'
import CategoryCard from '@/components/common/util/cards/CategoryCard.vue'

import { useBudgetCategoryStore } from '@/stores/category'

import type { Expense } from '@/types/expense/expense.interface'

const categoryStore = useBudgetCategoryStore()

const budgetCategories = categoryStore.allBudgetCategories

const showCreateCatModal = ref(false)

const selectedExpense = ref<Expense | null>(null)

const removeCategory = (id: string) => {
  categoryStore.removeCategory(id)
}
</script>

<template>
  <main class="w-full h-full px-16 pt-12">
    <div class="centered-col">
      <h1 class="text-2xl font-medium">Manage Budget Categories</h1>
      <p class="text-grey font-light text-sm mt-1 text-opacity-75">
        Categories represent what you spent your money on.
      </p>

      <button
        class="bg-primary text-white w-4/12 py-3 text-center press mt-8"
        @click.prevent="showCreateCatModal = true"
      >
        Add New Category
      </button>

      <div v-if="budgetCategories.length" class="align-col mt-16 w-7/12">
        <p class="text-dark-less font-medium mt-1">All Categories</p>

        <div class="mt-6 align-row gap-x-4 w-full flex-wrap">
          <CategoryCard
            v-for="(category, categoryIndex) in budgetCategories"
            :key="categoryIndex"
            :data="category"
            class="mb-4"
            :style="{ width: '30%' }"
            @remove="removeCategory(category.id)"
          />
        </div>
      </div>
    </div>
  </main>

  <CreateCategoryModal
    v-if="showCreateCatModal"
    :is-open="showCreateCatModal"
    :selected-expense="selectedExpense"
    @close="showCreateCatModal = false"
  />
</template>
