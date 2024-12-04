<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold dark:text-white">Seguradoras</h1>
      <NuxtLink 
        to="/seguradoras/nova"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Nova Seguradora
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-if="store.loading" class="text-center py-4">
      <span class="text-gray-600 dark:text-gray-400">Carregando...</span>
    </div>

    <!-- Error -->
    <div v-else-if="store.error" class="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 rounded-lg mb-4">
      {{ store.error }}
    </div>

    <!-- Tabela -->
    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nome</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">CNPJ</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Telefone</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="seguradora in store.seguradoras" :key="seguradora.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{{ seguradora.nome }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{{ seguradora.cnpj }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
              {{ seguradora.telefones?.length ? seguradora.telefones[0].numero : '-' }}
              {{ seguradora.telefones?.length > 1 ? `+${seguradora.telefones.length - 1}` : '' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                :class="seguradora.ativo ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'"
                class="px-2 py-1 text-xs rounded-full"
              >
                {{ seguradora.ativo ? 'Ativo' : 'Inativo' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <NuxtLink 
                :to="`/seguradoras/${seguradora.id}`"
                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3"
              >
                Editar
              </NuxtLink>
              <button 
                @click="store.toggleStatus(seguradora.id)"
                :class="seguradora.ativo ? 'text-red-600 dark:text-red-400 hover:text-red-800' : 'text-green-600 dark:text-green-400 hover:text-green-800'"
              >
                {{ seguradora.ativo ? 'Desativar' : 'Ativar' }}
              </button>
            </td>
          </tr>
          <tr v-if="store.seguradoras.length === 0">
            <td colspan="5" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
              Nenhuma seguradora cadastrada
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeguradoraStore } from '~/stores/seguradora'

const store = useSeguradoraStore()

// Carregar dados ao montar o componente
onMounted(() => {
  store.fetchSeguradoras()
})
</script> 