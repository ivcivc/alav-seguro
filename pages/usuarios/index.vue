<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Usuários</h1>
      <button 
        @click="abrirModalNovoUsuario"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Novo Usuário
      </button>
    </div>

    <!-- Tabela de Usuários -->
    <div class="bg-white rounded-lg shadow">
      <table class="min-w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Nome</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Cargo</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Ações</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="usuario in usuarios" :key="usuario.id">
            <td class="px-6 py-4">{{ usuario.nome }}</td>
            <td class="px-6 py-4">{{ usuario.email }}</td>
            <td class="px-6 py-4">{{ usuario.cargo }}</td>
            <td class="px-6 py-4">
              <span 
                :class="usuario.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                class="px-2 py-1 rounded-full text-sm"
              >
                {{ usuario.ativo ? 'Ativo' : 'Inativo' }}
              </span>
            </td>
            <td class="px-6 py-4">
              <button 
                @click="editarUsuario(usuario)"
                class="text-blue-600 hover:text-blue-800 mr-3"
              >
                Editar
              </button>
              <button 
                @click="toggleStatus(usuario)"
                class="text-gray-600 hover:text-gray-800"
              >
                {{ usuario.ativo ? 'Desativar' : 'Ativar' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de Novo/Editar Usuário -->
    <ModalUsuario 
      v-if="showModal"
      :usuario="usuarioSelecionado"
      @close="fecharModal"
      @save="salvarUsuario"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Usuario } from '~/types/usuario'

const usuarios = ref<Usuario[]>([])
const showModal = ref(false)
const usuarioSelecionado = ref<Usuario | null>(null)

// Buscar usuários ao carregar a página
onMounted(async () => {
  // Implementar chamada à API
  // usuarios.value = await fetchUsuarios()
})

const abrirModalNovoUsuario = () => {
  usuarioSelecionado.value = null
  showModal.value = true
}

const editarUsuario = (usuario: Usuario) => {
  usuarioSelecionado.value = usuario
  showModal.value = true
}

const fecharModal = () => {
  showModal.value = false
  usuarioSelecionado.value = null
}

const salvarUsuario = async (usuario: Usuario) => {
  // Implementar lógica de salvamento
  fecharModal()
}

const toggleStatus = async (usuario: Usuario) => {
  // Implementar lógica de ativação/desativação
}
</script> 