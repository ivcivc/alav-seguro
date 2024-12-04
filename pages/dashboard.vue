<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 dark:text-white">Dashboard</h1>
    
    <!-- Grid de Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total de Apólices -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2">Total de Apólices</h2>
        <p class="text-3xl font-bold text-gray-800 dark:text-white">0</p>
      </div>

      <!-- Comissões este mês -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2">Comissões este mês</h2>
        <p class="text-3xl font-bold text-gray-800 dark:text-white">R$ 0,00</p>
      </div>

      <!-- Apólices a vencer -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2">Apólices a vencer</h2>
        <p class="text-3xl font-bold text-gray-800 dark:text-white">0</p>
      </div>

      <!-- Novos Segurados -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-2">Novos Segurados</h2>
        <p class="text-3xl font-bold text-gray-800 dark:text-white">0</p>
      </div>
    </div>

    <!-- Últimas Apólices -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4 dark:text-white">Últimas Apólices</h2>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium dark:text-white">Segurado Tipo Val</h3>
            <span class="text-sm text-gray-500 dark:text-gray-400">Nenhuma apólice encontrada</span>
          </div>
          <!-- Lista de apólices (quando houver dados) -->
          <div class="mt-4">
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              Nenhuma apólice encontrada
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script> 