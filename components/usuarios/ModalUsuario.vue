<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
      <h2 class="text-xl font-bold mb-4">
        {{ usuario ? 'Editar Usuário' : 'Novo Usuário' }}
      </h2>

      <form @submit.prevent="salvar" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nome</label>
          <input 
            v-model="form.nome"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            v-model="form.email"
            type="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Cargo</label>
          <select 
            v-model="form.cargo"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="admin">Administrador</option>
            <option value="gerente">Gerente</option>
            <option value="corretor">Corretor</option>
            <option value="assistente">Assistente</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Permissões</label>
          <div class="mt-2 space-y-2">
            <div v-for="permissao in permissoes" :key="permissao.id" class="flex items-center">
              <input 
                type="checkbox"
                :value="permissao.id"
                v-model="form.permissoes"
                class="h-4 w-4 rounded border-gray-300"
              />
              <label class="ml-2 text-sm text-gray-700">
                {{ permissao.nome }}
                <span class="text-gray-500 text-xs">{{ permissao.descricao }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button 
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Usuario, Permissao } from '~/types/usuario'

const props = defineProps<{
  usuario?: Usuario | null
}>()

const emit = defineEmits<{
  close: []
  save: [usuario: Usuario]
}>()

const form = ref({
  nome: '',
  email: '',
  cargo: 'corretor',
  permissoes: [] as string[]
})

const permissoes = ref<Permissao[]>([
  { id: '1', nome: 'Gerenciar Usuários', descricao: 'Criar, editar e excluir usuários', chave: 'gerenciar_usuarios' },
  { id: '2', nome: 'Gerenciar Apólices', descricao: 'Criar e editar apólices', chave: 'gerenciar_apolices' },
  // Adicionar mais permissões conforme necessário
])

onMounted(() => {
  if (props.usuario) {
    form.value = {
      nome: props.usuario.nome,
      email: props.usuario.email,
      cargo: props.usuario.cargo,
      permissoes: props.usuario.permissoes.map(p => p.id)
    }
  }
})

const salvar = () => {
  // Aqui você pode adicionar validações adicionais
  emit('save', {
    ...form.value,
    permissoes: permissoes.value.filter(p => form.value.permissoes.includes(p.id))
  } as Usuario)
}
</script> 