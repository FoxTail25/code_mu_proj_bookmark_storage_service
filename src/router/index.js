import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView,
//     },
//     {
//       path: '/edit_group',
//       name: 'edit_group',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/EditGroupView.vue'),
//     },
//     {
//       path: '/edit_record',
//       name: 'edit_record',
//       component: () => import('../views/EditRecordView.vue'),
//     },
//   ],
// })
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/edit_group',
      name: 'edit_group',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditGroupView.vue'),
    },
    {
      path: '/edit_record',
      name: 'edit_record',
      component: () => import('../views/EditRecordView.vue'),
    },
  ],
})

export default router
