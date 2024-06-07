<template>
  <div class="stack-panel">
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
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: v-bind(spacing)rem;
  padding: v-bind(padding)rem;
}
</style>
-