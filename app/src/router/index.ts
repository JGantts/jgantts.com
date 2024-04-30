import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/NotFound.vue'

import WelcomePageVue from '@/views/WelcomePage.vue'
import GettingStartedPageVue from '@/views/GettingStartedPage.vue'
import ServicesPageVue from '@/views/ServicesPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/welcome/",
      name: "welcome",
      component: WelcomePageVue
    },
    {
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
      path: "/:pathMatch(.*)*",
      component: NotFound
    },
  ]
})

export default router
