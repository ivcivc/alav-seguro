<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div class="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center mb-6 dark:text-white">Login</h1>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email</label>
          <input 
            v-model="form.email"
            type="email"
            required
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
        </div>
        
        <div>
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Senha</label>
          <input 
            v-model="form.password"
            type="password"
            required
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
        </div>

        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>
        
        <button 
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

// Define o layout vazio
definePageMeta({
  layout: 'empty'
})

const router = useRouter()
const auth = useAuthStore()
const error = ref('')

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  try {
    error.value = ''
    await auth.login(form.value.email, form.value.password)
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Email ou senha inválidos'
  }
}

// Redirecionar se já estiver logado
onMounted(() => {
  if (auth.isAuthenticated) {
    router.push('/dashboard')
  }
})
</script> 