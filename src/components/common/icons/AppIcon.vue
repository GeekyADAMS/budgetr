<template>
  <Suspense>
    <template #default>
      <component
        :is="svgIcon"
        :style="{ height: '1rem' }"
        v-bind="$attrs"
        class="flex-none inline w-auto"
        :data-test-id="icon"
      />
    </template>
    <template #fallback>
      <div class="rounded-md" style="min-height: 16px; min-width: 16px" v-bind="$attrs"></div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue'
import type { PropType } from 'vue'
import iconMap from './iconMap'

const props = defineProps({
  icon: {
    type: String as PropType<keyof typeof iconMap>,
    required: true
  }
})

const { icon } = toRefs(props)
const svgIcon = computed(() => iconMap[icon.value] || 'div')
</script>
