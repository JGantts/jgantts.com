<script setup lang="ts">
import { useBreakpoint } from '@/common/Breakpoint';

import ReplayButton from "../components/ReplayButton.vue"
import Links from "../components/Links.vue"
import Background from "../components/Background.vue"

</script>

<template>
<Island :cornerRadius=1.5>
  <DStack
    :breakpoint="Breakpoint._3_M"
    padding="1rem"
    hSpacing="1rem"
    vSpacing="1rem"
  >
    <HStack spacing="1.0rem" style="width: 20rem;">
      <p style="max-width: 10rem; padding-bottom: 100%;">
        My Services 
      </p>
      <VStack style="width: 20rem;" id="text06" spacing="0.3rem" class="highlight">
        <p>
          From single pages to full websites and apps with customized features made to your requirements.
        </p>
        <p>
          <span class="medium">A single page includes:</span><br/>
          - Design (what the page looks like)<br/>
          - Hosting (making the page available)<br/>
          - Domain Name (like amazon.com)
        </p>
        <p>
          <span class="medium">A website or app also includes:</span><br/>
          - Additional pages<br/>
          - Release on the App Store and Google Play Store
        </p>
        <p>
          <span class="medium">Customized features may be:</span><br/>
          - Let customers make orders<br/>
          - Updating event calendar<br/>
          - Rewards system
          - And more
        </p>
        <p>
          Handling the technical details is what I do, ensuring
          your site improves
          customer interactions.
        </p>
      </VStack>
    </HStack>
  </DStack>
</Island>
</template>

<style scoped>
#text06 {
  max-width: 320px;
}

@media (min-width: 1025px) {
  #text06 {
    max-width: 530px;
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