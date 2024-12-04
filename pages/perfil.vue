<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 dark:text-white">Perfil do Usuário</h1>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-2xl">
      <!-- Mensagem de sucesso/erro -->
      <div v-if="message" 
           :class="{'bg-green-100 text-green-800': isSuccess, 'bg-red-100 text-red-800': !isSuccess}"
           class="p-4 rounded-lg mb-6">
        {{ message }}
      </div>

      <form @submit.prevent="salvarPerfil" class="space-y-6">
        <!-- Nome -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Nome</label>
          <input 
            v-model="form.nome"
            type="text"
            required
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
        </div>

        <!-- Email -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email</label>
          <input 
            v-model="form.email"
            type="email"
            required
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
        </div>

        <!-- Cargo (somente leitura) -->
        <div>
          <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Cargo</label>
          <input 
            :value="auth.user?.cargo"
            type="text"
            readonly
            class="w-full px-3 py-2 bg-gray-50 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
        </div>

        <!-- Botões -->
        <div class="flex justify-end space-x-4">
          <button 
            type="button"
            @click="$router.push('/dashboard')"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            :disabled="loading"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:disabled:opacity-50"
          >
            {{ loading ? 'Salvando...' : 'Salvar Alterações' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

// Define middleware de autenticação
definePageMeta({
  middleware: ['auth']
})

const auth = useAuthStore()
const router = useRouter()

const form = ref({
  nome: auth.user?.nome || '',
  email: auth.user?.email || ''
})

const loading = ref(false)
const message = ref('')
const isSuccess = ref(false)

// Função para mostrar mensagem temporária
const showMessage = (msg: string, success: boolean = true) => {
  message.value = msg
  isSuccess.value = success
  setTimeout(() => {
    message.value = ''
  }, 3000)
}

const salvarPerfil = async () => {
  try {
    loading.value = true

    // Validações básicas
    if (!form.value.nome.trim() || !form.value.email.trim()) {
      throw new Error('Todos os campos são obrigatórios')
    }

    // Simular chamada à API
    // const response = await fetch('/api/user/profile', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${auth.token}`
    //   },
    //   body: JSON.stringify({
    //     nome: form.value.nome,
    //     email: form.value.email
    //   })
    // })

    // if (!response.ok) throw new Error('Erro ao atualizar perfil')
    // const data = await response.json()

    // Atualizar store com novos dados
    auth.user = {
      ...auth.user!,
      nome: form.value.nome,
      email: form.value.email
    }

    showMessage('Perfil atualizado com sucesso!')
  } catch (error) {
    console.error('Erro ao salvar perfil:', error)
    showMessage(error instanceof Error ? error.message : 'Erro ao atualizar perfil', false)
  } finally {
    loading.value = false
  }
}

// Carregar dados do usuário ao montar o componente
onMounted(() => {
  if (!auth.user) {
    router.push('/login')
    return
  }

  form.value = {
    nome: auth.user.nome,
    email: auth.user.email
  }
})
</script> 