<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Cards do Dashboard -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-2">Apólices Ativas</h2>
        <p class="text-3xl font-bold text-blue-600">0</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-2">Segurados</h2>
        <p class="text-3xl font-bold text-green-600">0</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-2">Comissões Pendentes</h2>
        <p class="text-3xl font-bold text-orange-600">R$ 0,00</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script> 