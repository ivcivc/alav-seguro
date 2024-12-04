<template>
  <aside class="bg-gray-800 text-white w-64 min-h-screen fixed left-0 top-0">
    <div class="p-4 border-b border-gray-700">
      <h2 class="text-xl font-bold">Insurance System</h2>
    </div>
    
    <nav class="mt-4">
      <NuxtLink 
        v-for="item in menuItems" 
        :key="item.path"
        :to="item.path"
        class="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
        :class="{ 'bg-gray-700 text-white': route.path === item.path }"
      >
        <i :class="item.icon" class="mr-3"></i>
        {{ item.title }}
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()

const menuItems = [
  { title: 'Dashboard', path: '/dashboard', icon: 'fas fa-home' },
  { title: 'Apólices', path: '/apolices', icon: 'fas fa-file-contract' },
  { title: 'Clientes', path: '/clientes', icon: 'fas fa-users' },
  { title: 'Comissões', path: '/comissoes', icon: 'fas fa-money-bill' },
  { title: 'Relatórios', path: '/relatorios', icon: 'fas fa-chart-bar' },
]
</script> 