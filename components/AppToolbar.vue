<template>
  <header class="bg-white shadow-sm fixed top-0 right-0 left-64 h-16 z-10">
    <div class="h-full px-6 flex items-center justify-between">
      <div class="flex items-center">
        <button class="lg:hidden mr-4" @click="toggleSidebar">
          <i class="fas fa-bars text-gray-600"></i>
        </button>
        <h1 class="text-xl font-semibold text-gray-800">{{ route.name }}</h1>
      </div>
      
      <div class="flex items-center space-x-4">
        <button class="p-2 hover:bg-gray-100 rounded-full">
          <i class="fas fa-bell text-gray-600"></i>
        </button>
        <div class="relative">
          <button class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
            <img src="https://ui-avatars.com/api/?name=User" class="w-8 h-8 rounded-full" />
            <span class="text-sm font-medium text-gray-700">Usuário</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

const toggleSidebar = () => {
  // Implementar lógica do toggle para mobile
}
</script> 