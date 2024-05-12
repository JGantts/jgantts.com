<template>
  <div
    class="stack-panel"
    ref="stackPanelRef"
    :style="{
      '--h-spacing': props.hSpacing,
      '--v-spacing': props.vSpacing,
      '--breakpoint': props.breakpoint,
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, } from 'vue';

import { Breakpoint } from "../common/Breakpoint"

const props = defineProps({
  breakpoint: { type: Number, default: Breakpoint._2_M },
  padding: { type: String, default: "0" },
  hSpacing: { type: String, default: "0" },
  vSpacing: { type: String, default: "0" },
  cornerRadius: String,
})

const stackPanelRef = ref(null)

onMounted(() => {
  //@ts-expect-error
  let style = stackPanelRef.value?.style;
  if (!style) {
    return
  }

  if (props.breakpoint <= Breakpoint._0_XS) {
    style.setProperty('--layoutDir_0_XS', "row")
    style.setProperty('--spacing_0_XS',  props.hSpacing)
    style.setProperty('--background_parent_0_XS',  "var(--backgroundAppBase)")
    style.setProperty('--background_child_0_XS',  "clear")
    style.setProperty('--padding_parent_0_XS',  props.padding)
    style.setProperty('--padding_child_0_XS',  0)
  } else {
    style.setProperty('--layoutDir_0_XS', "column")
    style.setProperty('--spacing_0_XS',  props.vSpacing)
    style.setProperty('--background_parent_0_XS',  "clear")
    style.setProperty('--background_child_0_XS',  "var(--backgroundAppBase)")
    style.setProperty('--padding_parent_0_XS',  0)
    style.setProperty('--padding_child_0_XS',  props.padding)
  }

  if (props.breakpoint <= Breakpoint._1_S) {
    style.setProperty('--layoutDir_1_S', "row")
    style.setProperty('--spacing_1_S',  props.hSpacing)
    style.setProperty('--background_parent_1_S',  "var(--backgroundAppBase)")
    style.setProperty('--background_child_1_S',  "clear")
    style.setProperty('--padding_parent_1_S',  props.padding)
    style.setProperty('--padding_child_1_S',  0)
  } else {
    style.setProperty('--layoutDir_1_S', "column")
    style.setProperty('--spacing_1_S',  props.vSpacing)
    style.setProperty('--background_parent_1_S',  "clear")
    style.setProperty('--background_child_1_S',  "var(--backgroundAppBase)")
    style.setProperty('--padding_parent_1_S',  0)
    style.setProperty('--padding_child_1_S',  props.padding)
  }

  if (props.breakpoint <= Breakpoint._2_M) {
    style.setProperty('--layoutDir_2_M', "row")
    style.setProperty('--spacing_2_M',  props.hSpacing)
    style.setProperty('--background_parent_2_M',  "var(--backgroundAppBase)")
    style.setProperty('--background_child_2_M',  "clear")
    style.setProperty('--padding_parent_2_M',  props.padding)
    style.setProperty('--padding_child_2_M',  0)
  } else {
    style.setProperty('--layoutDir_2_M', "column")
    style.setProperty('--spacing_2_M',  props.vSpacing)
    style.setProperty('--background_parent_2_M',  "clear")
    style.setProperty('--background_child_2_M',  "var(--backgroundAppBase)")
    style.setProperty('--padding_parent_2_M',  0)
    style.setProperty('--padding_child_2_M',  props.padding)
  }

  if (props.breakpoint <= Breakpoint._3_L) {
    style.setProperty('--layoutDir_3_L', "row")
    style.setProperty('--spacing_3_L',  props.hSpacing)
    style.setProperty('--background_parent_3_L',  "var(--backgroundAppBase)")
    style.setProperty('--background_child_3_L',  "clear")
    style.setProperty('--padding_parent_3_L',  props.padding)
    style.setProperty('--padding_child_3_L',  0)
  } else {
    style.setProperty('--layoutDir_3_L', "column")
    style.setProperty('--spacing_3_L',  props.vSpacing)
    style.setProperty('--background_parent_3_L',  "clear")
    style.setProperty('--background_child_3_L',  "var(--backgroundAppBase)")
    style.setProperty('--padding_parent_3_L',  0)
    style.setProperty('--padding_child_3_L',  props.padding)
  }

  if (props.breakpoint <= Breakpoint._4_XL) {
    style.setProperty('--layoutDir_4_XL', "row")
    style.setProperty('--spacing_4_XL',  props.hSpacing)
    style.setProperty('--background_parent_4_XL',  "var(--backgroundAppBase)")
    style.setProperty('--background_child_4_XL',  "clear")
    style.setProperty('--padding_parent_4_XL',  props.padding)
    style.setProperty('--padding_child_0_XL',  0)
  } else {
    style.setProperty('--layoutDir_4_XL', "column")
    style.setProperty('--spacing_4_XL',  props.vSpacing)
    style.setProperty('--background_parent_4_XL',  "clear")
    style.setProperty('--background_child_4_XL',  "var(--backgroundAppBase)")
    style.setProperty('--padding_parent_4_XL',  0)
    style.setProperty('--padding_child_4_XL',  props.padding)
  }

  style.setProperty('--border-radius', props.cornerRadius )
})
</script>

<style scoped>
.stack-panel {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: var(--border-radius);
}
.stack-panel > * {
  border-radius: var(--border-radius);
}

.stack-panel {
  flex-direction: var(--layoutDir_0_XS);
  gap: var(--spacing_0_XS);
  padding: var(--padding_parent_0_XS);
  background-color: var(--background_parent_0_XS);
}
.stack-panel :deep(*) {
  padding: var(--padding_child_0_XS);
  background-color: var(--background_child_0_XS);
}

@media (min-width: 481px) {
  .stack-panel {
    flex-direction: var(--layoutDir_1_S);
    gap: var(--spacing_1_S);
    padding: var(--padding_parent_1_S);
    background-color: var(--background_parent_1_S);
  }
  .stack-panel :deep(*) {
    padding: var(--padding_child_1_S);
    background-color: var(--background_child_1_S);
  }
}

@media (min-width: 769px) {
  .stack-panel {
    flex-direction: var(--layoutDir_2_M);
    gap: var(--spacing_2_M);
    padding: var(--padding_parent_2_M);
    background-color: var(--background_parent_2_M);
  }
  .stack-panel :deep(*) {
    padding: var(--padding_child_2_M);
    background-color: var(--background_child_2_M);
  }
}

@media (min-width: 1025px) {
  .stack-panel {
    flex-direction: var(--layoutDir_3_L);
    gap: var(--spacing_3_L);
  }
  .stack-panel :deep(*) {
    padding: var(--padding_parent_3_L);
    background-color: var(--background_parent_3_L);
  }
}

@media (min-width: 1201px) {
  .stack-panel {
    flex-direction: var(--layoutDir_4_XL);
    gap: var(--spacing_4_XL);
    padding: var(--padding_parent_4_XL);
    background-color: var(--background_parent_4_XL);
  }
  .stack-panel :deep(*) {
    padding: var(--padding_child_4_XL);
    background-color: var(--background_child_4_XL);
  }
}
</style>
