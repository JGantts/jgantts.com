<template>
  <div
    class="stack-panel"
    ref="stackPanelRef"
    :style="{
      '--h-spacing': props.hSpacing,
      '--v-spacing': props.vSpacing,
      padding: props.padding,
      '--breakpoint': props.breakpoint,
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, } from 'vue';

import { Breakpoint } from "../common/Breakpoint"

const props = defineProps({
  breakpoint: { type: Number, default: Breakpoint._3_M },
  padding: { type: String, default: "0" },
  hSpacing: { type: String, default: "0" },
  vSpacing: { type: String, default: "0" },
})

const stackPanelRef = ref(null)

onMounted(() => {
  //@ts-expect-error
  let style = stackPanelRef.value?.style;
  if (!style) {
    return;
  }
  style.setProperty('--layoutDir_1_XS',  props.breakpoint <= Breakpoint._1_XS  ? "row" : "column" )
  style.setProperty('--layoutDir_2_S',   props.breakpoint <= Breakpoint._2_S   ? "row" : "column" )
  style.setProperty('--layoutDir_3_M',   props.breakpoint <= Breakpoint._3_M   ? "row" : "column" )
  style.setProperty('--layoutDir_4_L',   props.breakpoint <= Breakpoint._4_L   ? "row" : "column" )
  style.setProperty('--layoutDir_5_XL',  props.breakpoint <= Breakpoint._5_XL  ? "row" : "column" )
  style.setProperty('--layoutDir_6_XXL', props.breakpoint <= Breakpoint._6_XXL ? "row" : "column" )

  style.setProperty('--spacing_1_XS',  props.breakpoint <= Breakpoint._1_XS ?  props.hSpacing : props.vSpacing )
  style.setProperty('--spacing_2_S',   props.breakpoint <= Breakpoint._2_S  ?  props.hSpacing : props.vSpacing )
  style.setProperty('--spacing_3_M',   props.breakpoint <= Breakpoint._3_M  ?  props.hSpacing : props.vSpacing )
  style.setProperty('--spacing_4_L',   props.breakpoint <= Breakpoint._4_L  ?  props.hSpacing : props.vSpacing )
  style.setProperty('--spacing_5_XL',  props.breakpoint <= Breakpoint._5_XL ?  props.hSpacing : props.vSpacing )
  style.setProperty('--spacing_6_XXL', props.breakpoint <= Breakpoint._6_XXL ? props.hSpacing : props.vSpacing )
})
</script>

<style scoped>
.stack-panel {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.stack-panel {
  flex-direction: var(--layoutDir_1_XS);
  gap: var(--spacing_1_XS);
}

@media (min-width: 481px) {
  .stack-panel {
    flex-direction: var(--layoutDir_2_S);
    gap: var(--spacing_2_S);
  }
}

@media (min-width: 769px) {
  .stack-panel {
    flex-direction: var(--layoutDir_3_M);
    gap: var(--spacing_3_M);
  }
}

@media (min-width: 1025px) {
  .stack-panel {
    flex-direction: var(--layoutDir_4_L);
    gap: var(--spacing_4_L);
  }
}

@media (min-width: 1201px) {
  .stack-panel {
    flex-direction: var(--layoutDir_5_XL);
    gap: var(--spacing_5_XL);
  }
}

@media (min-width: 2560px) {
  .stack-panel {
    flex-direction: var(--layoutDir_6_XXL);
    gap: var(--spacing_6_XXL);
  }
}
</style>
