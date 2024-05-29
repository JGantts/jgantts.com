<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

import Island from "./components/Island.vue"
import DStack from "./library-jgantts/DStack.vue";
import HStack from "./library-jgantts/HStack.vue";
import VStack from "./library-jgantts/VStack.vue";
import ReplayButton from "./components/ReplayButton.vue"
import Links from "./components/Links.vue"
import ExpandedView from "./library-jgantts/ExpandedView.vue"
import Background from "./components/Background.vue"
import NavBar from './components/NavBar.vue';

import { setCSSColors } from './Curtain/ThemeHandler'
import { Breakpoint } from "./common/Breakpoint"
import {
  theme_dark,
  theme_light,
} from './Curtain/Themes'
import { BackgroundState } from './Curtain/Types';

import EnvelopeIcon from './assets/icons/envelope.svg'
import vuetify from './plugins/vuetify';

import { useTheme } from 'vuetify'

const sleep = (ms: number|undefined) => {
  return new Promise(resolve => setTimeout(resolve, ms || 2000));
}

const backgroundRef = ref(null)
const replayButtonRef = ref(null)

let checkDarkMode = (mediaMatch: MediaQueryListEvent | MediaQueryList) => {
  let matches = mediaMatch.matches
  //vuetify.theme.dark = matches;
  document.body.classList.toggle("dark-theme", matches);
  vuetify.theme.global.name.value =
    matches
    ? "themeDark"
    : "themeLight"
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

const drawer = ref(true)
const rail = ref(false)

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

</script>

<template>
  <v-app>
    <div id="box">
      <v-app-bar
        v-if="$vuetify.display.smAndDown"
        color="background"
        prominent
      >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title
          class="text-h3" color="green">
          <span class="highlight" :class="{ mellow: runningSecondary }">JGantts</span>
          <span>.com</span>
        </v-toolbar-title>
      </v-app-bar>
      
      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.smAndDown ? 'top' : 'start'"
        :permanent="$vuetify.display.mdAndUp"
        :rail="rail"
        color="background"
        temporary
      >
      <v-list >
        <v-list-item
          v-if="$vuetify.display.mdAndUp"
          variant="text"
          @click.stop="rail = !rail"
        >
          <prepend-icon>
              <v-icon v-if="rail">mdi-menu-close</v-icon>
              <v-icon v-if="!rail">mdi-menu-open</v-icon>
          </prepend-icon>
        </v-list-item>
        <v-list-item
          link :to="{ name: 'welcome' }"
        >
          <collapse-icon>
            <v-icon>mdi-home</v-icon>
          </collapse-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'getting-started' }">
          <v-list-item-content>
            <v-list-item-title>Getting Started</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> 
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <v-row>
            <v-spacer />
            <v-col
              cols="auto"
            >
              <v-card
                v-if="$vuetify.display.mdAndUp"
                color="background"
                rounded="pill"
                variant="flat"
                class="pa-3"
              >
                <v-card-text>
                  <p class="text-h1 text-center">
                    <span class="text-deep-orange" :class="{ mellow: runningSecondary }">JGantts</span>
                <span>.com</span>
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-spacer />
          </v-row>
          <v-row>
            <v-spacer />
            <v-col
              cols="auto"
            >
              <v-card
                color="background"
                rounded="pill"
                variant="flat"
                class="pa-2"
              >
                <v-card-text>
                  <p class="text-h4">
                    {{ $route.meta.title }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-spacer />
          </v-row>

          <router-view v-slot="{ Component }">
            <transition
              name="fade"
              mode="out-in"
            >
              <component :is="Component" :key="$route.path" /> 
            </transition>
          </router-view>

          <v-row>
            <v-spacer />
            <v-col
              cols="auto"
            >
              <v-card
                color="background"
                rounded="xl"
                variant="flat"
              >
                <v-card-text>
                  <v-row>
                    <v-col
                      cols="auto"
                    >
                      <a
                        href="mailto:contact@jgantts.com"
                        class="link text-h5 text-md-h4"
                      >
                        <span class="line">
                          <div
                            class="link-icon" :class="{ mellow: runningSecondary }" >
                            <EnvelopeIcon class="fa-icon" />
                          </div>
                          <span class="link-space">&nbsp;&nbsp;</span>
                          <span class="underline link text-h5">contact@jgantts.com</span>
                        </span>
                      </a>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-spacer />
                    <v-col cols="auto">
                      <p class="text-subtitle-1">© 2024 Jacob Gantt</p>
                    </v-col>
                    <v-spacer />
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-spacer />
          </v-row>
        </v-container>
      </v-main>
      <Background ref="backgroundRef" @first-run-done="firstRunDone"/>
    </div>
  </v-app>
</template>

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
  color: 
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
