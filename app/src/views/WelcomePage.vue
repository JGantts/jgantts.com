<script setup lang="ts">
import { Breakpoint } from '@/common/Breakpoint';

import Island from "../components/Island.vue"
import DStack from "../library-jgantts/DStack.vue";
import HStack from "../library-jgantts/HStack.vue";
import VStack from "../library-jgantts/VStack.vue";
import ReplayButton from "../components/ReplayButton.vue"
import Links from "../components/Links.vue"
import ExpandedView from "../library-jgantts/ExpandedView.vue"
import Background from "../components/Background.vue"
import NavBar from '../components/NavBar.vue';
import DIsland from '../components/DIsland.vue'

</script>

<template>
  <DIsland
    :breakpoint="Breakpoint._2_M"
    padding="0rem"
    hSpacing="1rem"
    vSpacing="1rem"
    cornerRadius="3rem"
  >
    <p class="text-h4" style="max-width: 20rem;">
      Hi, I'm<br />
      Jacob, a<br />
      professional<br />
      <span class="highlight">web</span> developer.
    </p>
    <VStack class="text-h5" id="text06" spacing="0.5rem">
      <p>
        I create websites tailored just for you, helping you form connections with your <span class="highlight">online community</span>.
      </p>
      <p>
        Handling the <span class="highlight">technical details</span> is what I do, ensuring your site improves interactions.
      </p>
      <router-link :to="{ name: 'getting-started' }">
        Getting Started
      </router-link>
    </VStack>
  </DIsland>
</template>

<style scoped>
#text06 {
  max-width: 320px;
}

@media (min-width: 1025px) {
  #text06 {
    max-width: 320px;
  }
}


#main02 {
  --alignment: center;
  --flex-alignment: center;
  --indent-left: 1;
  --indent-right: 1;
  --border-radius-tl: 1.5rem;
  --border-radius-tr: 1.5rem;
  --border-radius-br: 1.5rem;
  --border-radius-bl: 1.5rem;
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

#main02 > .inner {
  border-radius: var(--border-radius-tl) var(--border-radius-tr) var(--border-radius-br) var(--border-radius-bl);
  max-width: 100%;
  position: relative;
  width: calc(var(--width) + va(--padding-horizontal));
  z-index: 1;
  padding: var(--padding-vertical) var(--padding-horizontal);
}

#main02 > .inner > * {
  margin-top: var(--spacing);
  margin-bottom: var(--spacing);
}

#main02 > .inner > :first-child {
  margin-top: 0 !important;
}

#main02 > .inner > :last-child {
  margin-bottom: 0 !important;
}

#main02 > .inner > .full {
  margin-left: calc(var(--padding-horizontal) * -1);
  max-width: calc(100% + calc(var(--padding-horizontal) * 2) + 0.4725px);
  width: calc(100% + calc(var(--padding-horizontal) * 2) + 0.4725px);
}

#main02 > .inner > .full:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

#main02 > .inner > .full:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

#main02 > .inner > .full.screen {
  border-radius: 0 !important;
  max-width: 100vw;
  position: relative;
  width: 100vw;
  left: 50%;
  margin-left: -50vw;
  right: auto;
}

#main02 > .inner {
  --padding-horizontal: 0.75rem;
  --padding-vertical: 0.75rem;
  --spacing: 0rem;
  --width: 20rem;
}

@media (max-width: 736px) {
  #main02 > .inner {
    --padding-horizontal: 0.75rem;
    --padding-vertical: 0.75rem;
    --spacing: 0rem;
  }
}

@media (max-width: 480px) {
  #main02 > .inner {
    --spacing: 0rem;
  }
}

@media (max-width: 360px) {
  #main02 > .inner {
    --padding-horizontal: 0.75rem;
    --padding-vertical: 0.75rem;
    --spacing: 0rem;
  }
}
</style>
