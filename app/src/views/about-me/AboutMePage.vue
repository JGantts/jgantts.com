<script setup lang="ts">
import { Breakpoint } from '@/common/Breakpoint';

import Island from "../../components/Island.vue"
import DStack from "../../library-jgantts/DStack.vue";
import HStack from "../../library-jgantts/HStack.vue";
import VStack from "../../library-jgantts/VStack.vue";
import ReplayButton from "../../components/ReplayButton.vue"
import Links from "../../components/Links.vue"
import Background from "../../components/Background.vue"
import NavBar from '../../components/NavBar.vue';

import chuOld from './chuOld.png'
import chuNew from './chuNew.png'

</script>

<template>
<Island :cornerRadius=1.5>
  <DStack
    :breakpoint="Breakpoint._3_M"
    padding="1rem"
    hSpacing="1rem"
    vSpacing="1rem"
  >
    <DStack :breakpoint="Breakpoint._3_M" vSpacing="1.0rem" hSpacing="1.0rem">
      <VStack style="max-width: 6rem;" spacing="0.75rem">
        <p style="max-width: 6rem;">
          I'm Jacob, a
          <span class="highlight">programmer</span> who loves
          what he does.
        </p>
        <p>
          I'm from <span class="highlight">northeast Tennessee</span>, USA.
        </p>
      </VStack>
      <VStack id="text06" spacing="0.5rem">
        <p>
          I've written         
          <span class="highlight">software</span>
          for a few different companies over the years.
          I also have a desire to apply my skills to independently
          <span class="highlight">creating</span>
          productive software and websites.

        </p>
        <p>
          I got into programming because of an old game called
          <span class="italicized highlight">Creatures</span>.
          I wanted to add something to the game, so I followed some tutorials
          on how to make some basic modifications.
        </p>
        <p>
          <img :src="chuOld" style="float: left; height: 2.5rem;" class="inline-img"/>
          I decided to released a small upgrade for the game.
          <img :src="chuNew" style="float: right; height: 3.5rem;" class="inline-img"/>
          The upgrade took the simple list of past life events and added more info and photos.
        </p>
      </VStack>
    </DStack>
  </DStack>
</Island>
</template>

<style scoped>
#text06 {
  max-width: 400px;
}

@media (min-width: 1025px) {
  #text06 {
    max-width: 400px;
  }
}

.inline-img {
  margin: 0.125rem;
  border-radius: 0.5rem;
}

</style>
