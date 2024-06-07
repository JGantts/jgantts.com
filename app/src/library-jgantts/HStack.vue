<template>
<div
  class="stack-panel"
  :style="{
    '--padding-rem': $props.padding ?? '0' + 'rem',
    '--spacing-rem': $props.spacing ?? '0' + 'rem',
  }"
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
  gap: var(--spacing-rem);
}

.stack-panel :deep(> *) {
  padding: var(--padding-rem);
}
</style>
