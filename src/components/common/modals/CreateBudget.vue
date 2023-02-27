<script setup lang="ts">
import BaseModal from '../base/BaseModal.vue'

import { toRefs } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const { isOpen } = toRefs(props)
</script>

<template>
  <BaseModal :is-open="isOpen" @close="$emit('close')">
    <template #content>
      <div class="p-10 py-6 text-center">
        <h1 class="text-2xl font-medium">Create Budget</h1>
        <p class="text-grey font-light text-sm mt-1">Enter budget details for the current month</p>

        <form class="mt-10 border border-grey-light rounded-xl h-32 p-5">
          <button class="bg-primary text-white w-full py-3 text-center press">Create Budget</button>
        </form>
      </div>
    </template>
  </BaseModal>
</template>
