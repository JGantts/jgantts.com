<script setup lang="ts">
import NavBarItem from './NavBarItem.vue';
import VStack from '@/library-jgantts/VStack.vue';

</script>

<template>
  <div id="container-nav" class="container default full">
    <div class="wrapper">
      <div class="inner">
        <ul>
          <li>
            <NavBarItem :name="'welcome'" :title="'Welcome'" />
          </li>
          <li>
            <NavBarItem :name="'getting-started'" :title="'Getting Started'" />
          </li>
          <li>
            <NavBarItem :name="'about-me'" :title="'About Me'" />
          </li>
          <li>
            <NavBarItem :name="'about-me2'" :title="'About Me 2'" />
          </li>
          <!--<li>
            <NavBarItem :name="'services'" :title="'Services'" />
          </li>-->
        </ul>
      </div>
    </div>
  </div>
</template>
