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

</script>

<template>
<Island cornerRadius="1.5rem">
  <DStack
    :breakpoint="Breakpoint._2_M"
    padding="1rem"
    hSpacing="1rem"
    vSpacing="1rem"
  >
    <DStack :breakpoint="Breakpoint._2_M" vSpacing="1.0rem" hSpacing="1.0rem">
      <p style="max-width: 6rem;" class="highlight">
        Ready to <span class="">establish</span> your <span class="highlight">online</span> presence?
      </p>
      <VStack id="text06" spacing="0.25rem" style="text-align: center;">
        <p class="light medium"><a href="mailto:contact@jgantts.com"><span class="underline link01">Contact me</span></a> and we can<br/>set up a free meeting.</p>
        <p>Explore the benefits of a tailored website for your business. We&#x2019;ll review your unique needs and discuss strategies.</p>
        <p style="text-align: center;">
          <a href="mailto:contact@jgantts.com">
            <span class="bold highlight large"><span class="underline-hover link02">Email</span> for a chat</span>
            <br/>
            <span class="highlight light">No Commitment</span>
          </a>
        </p>
      </VStack>
    </DStack>
  </DStack>
</Island>
</template>

<style scoped>
#text06 {
  max-width: 320px;
}

@media (min-width: 1025px) {
  #text06 {
    max-width: 500px;
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

<style scoped>
a {
  text-decoration: none;
}
a .underline {
  text-decoration: underline;
}
a:hover .link01 {
  color: var(--textAccentOnBase);
}
a:hover .link02 {
  text-decoration: underline;
}
a:hover .underline-hover {
  text-decoration: underline;
}
</style>