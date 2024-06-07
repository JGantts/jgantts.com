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
          text-xl
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
        w-64
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