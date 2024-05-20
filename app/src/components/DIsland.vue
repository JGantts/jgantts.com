<template>
  <div
    class="stack-panel bg-primary"
    ref="stackPanelRef"
    :style=dynamicStyles
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, type StyleValue, type CSSProperties, onUnmounted, } from 'vue';

import { Breakpoint } from "../common/Breakpoint"

const props = defineProps({
  breakpoint: { type: Number, default: Breakpoint._2_M },
  padding: { type: String, default: "0" },
  hSpacing: { type: String, default: "0" },
  vSpacing: { type: String, default: "0" },
  cornerRadius: Number,
})

const stackPanelRef = ref(null)

const dynamicStyles = computed<StyleValue>(() =>
{
  let toReturn: StyleValue

  let rowStyle: CSSProperties =
  {
    '--layoutDir': "row",
    '--spacing':  props.hSpacing,
    '--background_parent':  "var(--backgroundAppBase)",
    '--background_child':  "clear",
    '--padding_parent':  props.padding,
    '--padding_child':  0,
  }
  let columnStyle: CSSProperties =
  {
    '--layoutDir': "column",
    '--spacing':  props.vSpacing,
    '--background_parent':  "clear",
    '--background_child':  "var(--backgroundAppBase)",
    '--padding_parent':  0,
    '--padding_child':  props.padding,
  }

  toReturn = rowStyle

  if (windowWidth.value < props.breakpoint)
  {
    toReturn = columnStyle
  }

  toReturn['borderRadius'] = props.cornerRadius + 'rem'
  toReturn['padding'] = (props.cornerRadius ?? 0)/2 + 'rem'

  return toReturn
})

const windowWidth = ref(window.innerWidth);
function handleResize() {
  windowWidth.value = window.innerWidth;
}
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.stack-panel {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: v-bind(cornerRadius);
}
.stack-panel > * {
  border-radius: v-bind(cornerRadius);
}

.stack-panel {
  flex-direction: var(--layoutDir);
  gap: var(--spacing);
  padding: var(--padding_parent);
  background-color: var(--background_parent);
}
.stack-panel :deep(> *) {
  padding: var(--padding_child);
  background-color: var(--background_child);
}
</style>
