<template>
  <div>
    <!-- Pode ficar vazio, pois vamos redirecionar imediatamente -->
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Redirecionar para a página de edição usando o ID especial 'nova'
  router.replace({
    name: 'seguradoras-id',
    params: { id: 'nova' }
  })
})
</script> 