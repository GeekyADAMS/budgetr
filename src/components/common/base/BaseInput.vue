<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  maxLength: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:value', 'change'])

const { id, value: val } = toRefs(props)

const value = computed({
  get: () => val.value,
  set: (newVal) => {
    emit('update:value', newVal)
    emit('change', newVal)
  }
})
</script>

<template>
  <div class="form-group align-col w-full">
    <label :for="id" class="align-col focus-within:text-primary"
      ><span class="text-left text-sm mb-1.5">{{ label }}</span>
      <input
        v-model="value"
        class="border border-grey-light px-3 py-2 text-dark font-semibold focus:border-primary outline-none"
        :id="id"
        :type="type"
        :maxlength="maxLength"
      />
    </label>
  </div>
</template>
