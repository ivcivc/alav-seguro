import { defineStore } from 'pinia'
import type { Usuario } from '~/types/usuario'

export const useUsuariosStore = defineStore('usuarios', {
  state: () => ({
    usuarios: [] as Usuario[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchUsuarios() {
      this.loading = true
      try {
        // Implementar chamada à API
        // this.usuarios = await api.get('/usuarios')
      } catch (error) {
        this.error = 'Erro ao carregar usuários'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async salvarUsuario(usuario: Usuario) {
      try {
        // Implementar chamada à API
        // const response = await api.post('/usuarios', usuario)
        await this.fetchUsuarios()
      } catch (error) {
        console.error(error)
        throw error
      }
    },

    async toggleStatus(usuario: Usuario) {
      try {
        // Implementar chamada à API
        // await api.patch(`/usuarios/${usuario.id}/toggle-status`)
        await this.fetchUsuarios()
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  }
}) 