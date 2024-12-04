export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()
  
  // Se não estiver autenticado e não estiver indo para login
  if (!auth.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }
  
  // Se estiver autenticado e tentar acessar login
  if (auth.isAuthenticated && to.path === '/login') {
    return navigateTo('/dashboard')
  }
}) 