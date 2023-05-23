 import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages' 

import { AuthenticationStore } from '@/stores/Authentication'
// lazy load

const importPage = (view:string) => () =>
  import(/* webpackChunkName: "p-[request]" */ `./views/${view}.vue`)
  
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
  ],
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const authentication = AuthenticationStore() // obtiene el usuario actual
  const { isAuthenticate, permissions } = storeToRefs(authentication)

  if (requiresAuth && !isAuthenticate.value) {
    next('/login') // redirige al usuario al login si la ruta requiere autenticación y el usuario no está autenticado
  }
  else {
    const requiredPermission = to.meta.requiredPermission
    if (requiredPermission && isAuthenticate.value && !permissions.value.includes(requiredPermission))
      next('/unauthorized') // redirige al usuario a una página de error si no tiene los permisos necesarios para acceder a la ruta

    else
      next() // permite el acceso a la ruta
  }
})

export default router // importa tu servicio de autenticación
