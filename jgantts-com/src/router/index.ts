import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  //@ts-expect-error
  type ScrollBehaviorNormalized,
} from 'vue-router'
import NotFound from '../views/NotFound.vue'

import WelcomePageVue from '@/views/WelcomePage.vue'
/*import GettingStartedPageVue from '@/views/GettingStartedPage.vue'
import ServicesPageVue from '@/views/ServicesPage.vue'
import AboutMePage from '@/views/about-me/AboutMePage.vue'
import AboutMe2Page from '@/views/about-me/AboutMe2Page.vue'*/


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/welcome/",
      name: "welcome",
      component: WelcomePageVue
    },
    /*{
      path: "/services/",
      name: "services",
      component: ServicesPageVue
    },
    {
      path: "/getting-started/",
      name: "getting-started",
      component: GettingStartedPageVue
    },
    {
      path: "/about-me/",
      name: "about-me",
      component: AboutMePage
    },
    {
      path: "/about-me2/",
      name: "about-me2",
      component: AboutMe2Page
    },


    {
      path: "/:pathMatch(.*)*",
      component: NotFound
    },*/
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
