import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/code_mu_proj_bookmark_storage_service/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/code_mu_proj_bookmark_storage_service/edit_group',
      name: 'edit_group',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditGroupView.vue'),
    },
    {
      path: '/code_mu_proj_bookmark_storage_service/edit_record',
      name: 'edit_record',
      component: () => import('../views/EditRecordView.vue'),
    },
  ],
})

export default router
