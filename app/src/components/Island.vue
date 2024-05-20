<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  cornerRadius: number;
}>()
</script>

<template>
  <div class="bg-primary" :style="{
    borderRadius: '' + props.cornerRadius + 'rem',
    padding: '' + props.cornerRadius/2 + 'rem',
  }">
    <slot />
  </div>
</template>
