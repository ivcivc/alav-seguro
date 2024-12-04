<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <form @submit.prevent="salvarApolice" class="space-y-8 divide-y divide-gray-200">
        <div class="space-y-6">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Nova Apólice
            </h3>
          </div>
  
          <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700">
                Tipo de Seguro
              </label>
              <select
                v-model="form.tipo"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="vida">Vida</option>
                <option value="incendio">Incêndio</option>
                <option value="veiculo">Veículo</option>
                <option value="frota">Frota</option>
              </select>
            </div>
  
            <!-- Adicionar outros campos do formulário -->
          </div>
        </div>
  
        <div class="pt-5">
          <div class="flex justify-end">
            <button
              type="submit"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  const form = ref({
    tipo: 'vida',
    // Adicionar outros campos
  })
  
  const salvarApolice = async () => {
    // Implementar lógica de salvamento
  }
  </script>