<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  name: String,
  title: String,
})

</script>


<template>
  <router-link :to="{ name }">
    <div class="main main-nav">
      <div class="inner">
        <p class="text-h4">{{ title }}</p>
      </div>
    </div>
  </router-link>
</template>

<style>
.router-link-active > .main > .inner {
  color: var(--textAccentOnAccent);
  background-color: var(--backgroundSolidAccent);
  transition: color 0.25s, background-color 0.25s;
}

#container-nav > .wrapper > .inner > ul {
  display: flex;
  flex-direction: row;
  align-items: center;

}

#container-nav > .wrapper > .inner > ul > li {
  display: inline;
  padding: 0.5rem;
}

#container-nav a {
  text-decoration: none;
}

@media (max-width: 736px) {
#container-nav > .wrapper > .inner > ul {
  flex-direction: column; 
}
}

@media (max-width: 480px) {
#container-nav > .wrapper > .inner > ul {
  flex-direction: column; 
}
}

@media (max-width: 360px) {
#container-nav > .wrapper > .inner > ul {
  flex-direction: column; 
}
}

.main-nav {
  --alignment: center;
  --flex-alignment: center;
  --indent-left: 1;
  --indent-right: 1;
  --border-radius-tl: 1.25rem;
  --border-radius-tr: 1.25rem;
  --border-radius-br: 1.25rem;
  --border-radius-bl: 1.25rem;
  align-items: center;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
  max-width: 100%;
  position: relative;
  text-align: var(--alignment);
  z-index: 1;
  border-radius: var(--border-radius-tl) var(--border-radius-tr) var(--border-radius-br) var(--border-radius-bl);
}

.main-nav > .inner {
  border-radius: var(--border-radius-tl) var(--border-radius-tr) var(--border-radius-br) var(--border-radius-bl);
  max-width: 100%;
  position: relative;
  min-width: var(--width);
  z-index: 1;
  padding: var(--padding-vertical) var(--padding-horizontal);
  border-width: 10px;
  background-color: var(--uiElementBackgroundBase);
}

.main-nav > .inner > * {
  margin-top: var(--spacing);
  margin-bottom: var(--spacing);
}

.main-nav > .inner > :first-child {
  margin-top: 0 !important;
}

.main-nav > .inner > :last-child {
  margin-bottom: 0 !important;
}

.main-nav > .inner > .full {
  margin-left: calc(var(--padding-horizontal) * -1);
  max-width: calc(100% + calc(var(--padding-horizontal) * 2) + 0.4725px);
  width: calc(100% + calc(var(--padding-horizontal) * 2) + 0.4725px);
}

.main-nav > .inner > .full:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  margin-top: calc(var(--padding-vertical) * -1) !important;
}

.main-nav > .inner > .full:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  margin-bottom: calc(var(--padding-vertical) * -1) !important;
}

.main-nav > .inner > .full.screen {
  border-radius: 0 !important;
  max-width: 100vw;
  position: relative;
  width: 100vw;
  left: 50%;
  margin-left: -50vw;
  right: auto;
}

.main-nav > .inner {
  --padding-horizontal: 0.75rem;
  --padding-vertical: 0.75rem;
  --spacing: 1rem;
  --width: 8rem;
}
</style>
