import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Content'),
    children: [
      {
        path: '',
        component: () => import('@/views/Listing'),
        children: [
          {
            path: '',
            name: 'addItem',
            component: () => import('@/views/listing/AddItem')
          },
          {
            path: 'edit/:id',
            name: 'editItem',
            component: () => import('@/views/listing/EditItem')
          }
        ]
      },
      {
        path: 'dienstplan',
        name: 'roster',
        component: () => import('@/views/Roster')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = store.state.accessToken !== null
  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
