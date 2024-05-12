<template>
  <div
    class="stack-panel"
    ref="stackPanelRef"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, } from 'vue';
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  padding: { type: String, default: "0" },
  spacing: { type: String, default: "0" },
})

let uuid: UUID

onMounted(() => {
  //@ts-expect-error
  let style = stackPanelRef.value?.style;
  if (!style) {
    return
  }

  style.setProperty('--gap',  props.spacing)
  style.setProperty('--pading',   props.padding)


  uuid = uuidv4()
})

const stackPanelRef = ref(null)
</script>

<style scoped>
.stack-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap);
}

.stack-panel > * {
  padding: var(--padding);
}
</style>
