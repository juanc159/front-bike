<script>
import { useAuthenticationStore } from '@/stores/useAuthenticationStore'

export default {
  setup() {
    const authentication = useAuthenticationStore()
    const router = useRouter()

    return {
      authentication,
      router,
    }
  },

  data() {
    return {
      sessionTimeout: null,
    }
  },
  mounted() {
    // reiniciar el temporizador cuando se detecta una acción del usuario
    document.addEventListener('mousemove', this.resetSessionTimeout)
    document.addEventListener('keypress', this.resetSessionTimeout)
    document.addEventListener('click', this.resetSessionTimeout)
    this.resetSessionTimeout()
  },
  beforeUnmount() {
    // eliminar los event listeners cuando el componente se desmonta
    document.removeEventListener('mousemove', this.resetSessionTimeout)
    document.removeEventListener('keypress', this.resetSessionTimeout)
    document.removeEventListener('click', this.resetSessionTimeout)
  },
  methods: {
    resetSessionTimeout() {
      clearTimeout(this.sessionTimeout)
      this.sessionTimeout = setTimeout(() => {
        // llamar a la función para cerrar sesión del usuario
        // this.logout();
      }, 10 * 60 * 1000) // 10 minutos en milisegundos-600000
    },
    logout() {
      this.authentication.logout()
      this.router.push({ name: 'Login' })

      // lógica para cerrar sesión del usuario
    },
  },
}
</script>

<template>
  <div>
    <!-- contenido del componente -->
  </div>
</template>
