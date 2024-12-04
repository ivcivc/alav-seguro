<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Alterar Senha</h1>
    <div class="bg-white rounded-lg shadow p-6">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Senha Atual</label>
        <input 
          v-model="form.senhaAtual"
          type="password"
          class="w-full px-3 py-2 border rounded-lg"
        >
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Nova Senha</label>
        <input 
          v-model="form.novaSenha"
          type="password"
          class="w-full px-3 py-2 border rounded-lg"
        >
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2">Confirmar Nova Senha</label>
        <input 
          v-model="form.confirmarSenha"
          type="password"
          class="w-full px-3 py-2 border rounded-lg"
        >
      </div>
      <button 
        @click="alterarSenha"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Alterar Senha
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  senhaAtual: '',
  novaSenha: '',
  confirmarSenha: ''
})

const alterarSenha = async () => {
  // Implementar lógica para alterar senha
}
</script> 