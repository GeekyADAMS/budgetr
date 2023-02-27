<script setup lang="ts">
import { toRefs } from 'vue'

import RoundCloseWhite from '@@/icons/RoundCloseWhite.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  styles: {
    type: String,
    default: ''
  }
})

const { isOpen, styles } = toRefs(props)
</script>

<template>
  <div v-if="isOpen" class="w-screen h-screen fixed top-0 left-0 modal z-50">
    <div
      class="backdrop w-full h-full absolute bg-dark bg-opacity-80 backdrop-blur z-20"
      @click="$emit('close')"
    ></div>

    <div
      class="inner-modal z-30 absolute top-10 h-fit left-0 right-0 mx-auto w-5/12"
      :style="{ maxHeight: '90%' }"
    >
      <RoundCloseWhite class="w-8 h-8 ml-auto press" @click="$emit('close')" />

      <div
        :class="['mt-4 w-full  h-fit bg-white  overflow-y-scroll', styles]"
        :style="{ maxHeight: '95%' }"
      >
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
