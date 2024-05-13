<template>
<div
  class="stack-panel"
>
  <slot />
</div>
</template>

<script setup lang="ts">
const props = defineProps({
  padding: { type: String, default: "0" },
  spacing: { type: String, default: "0" },
})
</script>

<style scoped>
.stack-panel {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--spacing);
}

.stack-panel :deep(> *) {
  padding: v-bind(padding);
}
</style>
