<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

import ReplayButton from "./components/ReplayButton.vue"
import Links from "./components/Links.vue"
import Background from "./components/Background.vue"

import { setCSSColors } from './Curtain/ThemeHandler'
import { Rounded } from "./tailwindEnums/Rounded"
import {
  theme_dark,
  theme_light,
} from './Curtain/Themes'
import { BackgroundState } from './Curtain/Types';

import EnvelopeIcon from './assets/icons/envelope.svg'

import { useTheme } from 'vuetify'

import { useBreakpoint } from './common/Breakpoint';

const sleep = (ms: number|undefined) => {
  return new Promise(resolve => setTimeout(resolve, ms || 2000));
}

const backgroundRef = ref(null)
const replayButtonRef = ref(null)

let checkDarkMode = (mediaMatch: MediaQueryListEvent | MediaQueryList) => {
  let matches = mediaMatch.matches
  //vuetify.theme.dark = matches;
  document.body.classList.toggle("dark-theme", matches);
  setCSSColors(matches ? theme_dark : theme_light)
}

async function pausePlay() {
  runningSecondary.value = true
  //@ts-expect-error
  replayButtonRef.value.backgroundState = BackgroundState.AfterFirstLoading
  //await sleep(2500)
  //@ts-expect-error
  replayButtonRef.value.backgroundState = await backgroundRef.value?.pausePlay()
}

const runningSecondary = ref(false)

function firstRunDone() {
  //@ts-expect-error
  replayButtonRef.value?.firstRunDone()
}

const windowWidth = ref(window.innerWidth);
function handleResize() {
  windowWidth.value = window.innerWidth;
}
onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize()
  const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)")
  darkModePreference.addEventListener("change", checkDarkMode)
  checkDarkMode(darkModePreference)
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const breakpoint = useBreakpoint();

console.log(breakpoint)
</script>

<template>
    <div id="box">
      <div
        v-if="!breakpoint.greaterThanSm.value"
        class="
          navbar bg-base-100
        ">
        <div class="
          flex-1
          flex
          justify-center
        ">
          <a class="btn btn-ghost text-4xl gap-0">
            <span
              class="text-primary"
              :class="{ mellow: runningSecondary }"
            >
              JGantts
            </span>
            <span>.com</span>
          </a>
        </div>
     </div>


      <div
        padding="1rem 0"
        spacing="1rem"
        class="
          flex
          flex-col
          justify-center
          items-center
          gap-3
          p-3
          text-lg
        "
      >
        <div
          v-if="breakpoint.greaterThanSm.value"
        >
          <p
            class="
              bg-base-100
              rounded-xl
              text-4xl
              p-2
              flex-1
              flex
              justify-center
            "
          >
            <span
              class="text-primary"
              :class="{ mellow: runningSecondary }"
            >
              JGantts
            </span>
            <span>.com</span>
          </p>
        </div>
        <div class="
          rounded-xl
          bg-primary
          text-primary-content
          p-2
        ">
          <p
            class=""
          >
            {{ $route.meta.title }}
          </p>
        </div>
        <router-view v-slot="{ Component }">
          <transition
            name="fade"
            mode="out-in"
          >
            <component :is="Component" :key="$route.path" /> 
          </transition>
        </router-view>
        <div 
        class="
        
        bg-base-100
        rounded-lg
        w-56
        p-2
        text-center
        ">
        <a
          href="mailto:contact@jgantts.com"
          class="text-primary"
        >
            <div
              class="
                flex
                gap-1
                justify-center
                items-center
              "
            >
              <div
                class="link-icon text-neutral-content"
                :class="{ mellow: runningSecondary }" 
              >
                <EnvelopeIcon class="fa-icon" />
              </div>
              <p class="">contact@jgantts.com</p>
            </div>
          </a>

          <p class="text-subtitle-1">© 2024 Jacob Gantt</p>
        </div>

      </div>
      <Background ref="backgroundRef" @first-run-done="firstRunDone"/>
    </div>
</template>
<!--
<style>
.v-navigation-drawer.custom-drawer {
  background-color: var(--backgroundAppBase); /* Deep purple */
}

#app {
  top: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

#box {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  z-index: 2;
  overflow: visible;
}

#content {
  position: relative;
  max-width: 100vw;
  max-height: 100vh;
  z-index: 3;
}

.main {
  background-color: var(--backgroundAppBase);
}

.link {
  text-decoration: none;
}

.title {
  color: var(--textAccentOnAccent);
  background-color: var(--backgroundSolidAccent);
  transition: color 0.25s, background-color 0.25s;

  justify-content: center;
  max-width: 100%;
  position: relative;
  text-align: center;
  z-index: 1;
  border-radius: 1.75rem;
  padding: var(--padding-horizontal) var(--padding-vertical);
}

.title {
  --padding-horizontal: 1rem;
  --padding-vertical: 1rem;
  --width: 12rem;
}

@media (max-width: 736px) {
  .title {
    --padding-horizontal: 1rem;
    --padding-vertical: 1rem;
    --width: 6rem;
  }
}

@media (max-width: 480px) {
  .title {
    --width: 6rem;
  }
}

@media (max-width: 360px) {
  .title {
    --padding-horizontal: 1rem;
    --padding-vertical: 1rem;
    --width: 6rem;
  }
}

.main-holder {
  --alignment: center;
  --flex-alignment: center;
}

#replay-holder {
  display: flex;
  justify-content: space-between;
  align-items: center; /* To vertically center the items */
  gap: 0.5rem;
}

#replay-sibling {
  font-size: 1em;

  flex-grow: 1; /* Allow the sibling to grow and take up available space */
  text-align: center; /* Center the content of the sibling */
  max-width: calc(100vw - 8px);
  overflow: clip;
}

.replay-button {
  width: 1rem;
}

.text01-accent {
  color: var(--textAccentOnBase);
  font-size: 2rem;
  line-height: 1.5;
  font-weight: 500;
}

.text01 {
  font-size: 2rem;
  line-height: 1.5;
  font-weight: 500;
}

#text02 {
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 300;
}

#text03 {
  color: var(--textGrayOnBaseLowContrast);
  font-size: 0.625rem;
  line-height: 1.5;
  font-weight: 300;
}

#text04 {
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 400;
}

.text05 {
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;

}

#text06 {
  text-align: start;
  font-size: 0.625rem;
  line-height: 1.5;
  font-weight: 400;
}

#text06>p {
  padding-bottom: 0.25rem;
}

#text07 {
  font-size: 0.5rem;
  line-height: 1.5;
  font-weight: 300;
}

#text07-accent {
  font-size: 0.5rem;
  line-height: 1.5;
  font-weight: 400;
}


.highlight {
  color: var(--textAccentOnBase);
}

.heavy {
  font-weight: 800;
}

.bold {
  font-weight: 600;
}

.light {
  font-weight: 100;
}

.large {
  font-size: 0.9rem;
}

.medium {
  font-size: 0.8rem;
}

.text-h1 {
  font-size: 1rem;
}
</style>
<style scoped>
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to, .slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-active, .slide-enter-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
 
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity 0.2s ease-in 0s;
  color: rgba(0, 0, 0, 0);
}
.fade-enter-active {
  transition: opacity 0.2s ease-out calc(0.4s - 0.2s);
  color: rgba(0, 0, 0, 0);
}
</style>

<style>
.mellow {
  color: var(--textBaseOnAccentLowContrast);
  transition: color 3s ease-in-out 1.5s;
}

.line {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.link-icon {
  color: var(--textAccentOnBase);
}

.link {
  cursor: pointer;
  white-space: nowrap;
}
</style>

<style scoped>
a {
  text-decoration: none;
}
a .underline {
  text-decoration: underline;
}
a:hover {
  text-decoration: none;
}
a:hover .link, a:hover .link-icon {
  color: var(--textAccentOnBase);
}
</style>
-->
