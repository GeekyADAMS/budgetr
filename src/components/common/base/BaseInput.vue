<script setup lang="ts">
import { computed, ref, toRefs, type StyleValue } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number, Date],
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
  },
  min: {
    type: Number,
    default: 0
  },
  required: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:value', 'change'])

const { id, value: val, label, type, required } = toRefs(props)

const value = computed({
  get: () => val.value,
  set: (newVal) => {
    emit('update:value', newVal)
    emit('change', newVal)
  }
})

const isTouched = ref(false)
</script>

<template>
  <div class="form-group align-col w-full">
    <label :for="id" class="align-col focus-within:text-primary"
      ><span class="text-left text-sm mb-1.5"
        >{{ label }} <span v-if="required" class="text-red-400">*</span></span
      >
      <input
        v-model="value"
        class="border border-grey-light px-3 py-2 text-dark font-semibold focus:border-primary outline-none"
        :style="{ backgroundColor: type === 'color' ? value : undefined } as StyleValue"
        :id="id"
        :type="type"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :min="min"
        @focusout="isTouched = true"
      />
    </label>
    <span
      v-show="required && isTouched && !value"
      class="text-red-300 mt-1.5 text-sm text-left font-light"
      >Please enter valid {{ id }}</span
    >
  </div>
</template>
