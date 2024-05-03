<script setup lang="ts">
import NavBarItem from './NavBarItem.vue';

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
            <NavBarItem :name="'about-me'" :title="'Who am I?'" />
          </li>
          <!--<li>
            <NavBarItem :name="'services'" :title="'Services'" />
          </li>-->
        </ul>
      </div>
    </div>
  </div>
</template>
