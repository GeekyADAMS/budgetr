<script setup lang="ts">
import { ref, toRefs } from 'vue'

import BaseModal from '../base/BaseModal.vue'
import BaseInput from '../base/BaseInput.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const { isOpen } = toRefs(props)

const budgetName = ref('')
const budgetAmount = ref(0)
</script>

<template>
  <BaseModal :is-open="isOpen" @close="$emit('close')">
    <template #content>
      <div class="p-10 py-8 pb-16 text-center">
        <h1 class="text-2xl font-medium">Create Budget</h1>
        <p class="text-grey font-light text-sm mt-1">Enter budget details for the current month</p>

        <form class="mt-10 border border-grey-light rounded-xl p-5 pt-5 py-8">
          <BaseInput v-model:value="budgetName" class="mb-4" id="budget-name" label="Budget Name" />
          <BaseInput
            v-model:value="budgetAmount"
            class="mb-5"
            id="budget-amount"
            type="number"
            label="Budget Amount"
          />
          <button class="bg-primary text-white w-full py-3 text-center press" @click.prevent="">
            Create Budget
          </button>
        </form>
      </div>
    </template>
  </BaseModal>
</template>
