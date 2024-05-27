import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  //@ts-expect-error
  type ScrollBehaviorNormalized,
} from 'vue-router'
import NotFound from '../views/NotFound.vue'

import WelcomePageVue from '@/views/WelcomePage.vue'
import GettingStartedPageVue from '@/views/GettingStartedPage.vue'
import ServicesPageVue from '@/views/ServicesPage.vue'
import AboutMePage from '@/views/about-me/AboutMePage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/welcome/",
      name: "welcome",
      meta: { title: 'Welcome' },
      component: WelcomePageVue
    },
    {
      path: "/services/",
      name: "services",
      meta: { title: 'Services' },
      component: ServicesPageVue
    },
    {
      path: "/getting-started/",
      name: "getting-started",
      meta: { title: 'Getting Started' },
      component: GettingStartedPageVue
    },
    {
      path: "/about-me/",
      name: "about-me",
      meta: { title: 'About Me' },
      component: AboutMePage
    },/*
    {
      path: "/about-me2/",
      name: "about-me2",
      meta: { title: 'About Me 2' },
      component: AboutMe2Page
    },
*/

    {
      path: "/:pathMatch(.*)*",
      meta: { title: 'Our Bad (Error 404)' },
      component: NotFound
    },
  ],
  scrollBehavior(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    savedPosition: ScrollBehaviorNormalized
  ) {
    // always scroll to top
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
})

export default router
