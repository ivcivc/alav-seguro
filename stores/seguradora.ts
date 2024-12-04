import { defineStore } from 'pinia'

export const useSeguradoraStore = defineStore('seguradora', {
  state: () => ({
    seguradoras: [] as Seguradora[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchSeguradoras() {
      this.loading = true
      try {
        // Aqui virá a chamada à API
        // const response = await fetch('/api/seguradoras')
        // this.seguradoras = await response.json()
      } catch (err) {
        this.error = 'Erro ao carregar seguradoras'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async salvarSeguradora(seguradora: Partial<Seguradora>) {
      this.loading = true
      try {
        if (seguradora.id) {
          // Atualizar existente
          // await fetch(`/api/seguradoras/${seguradora.id}`, {
          //   method: 'PUT',
          //   body: JSON.stringify(seguradora)
          // })
          const index = this.seguradoras.findIndex(s => s.id === seguradora.id)
          if (index !== -1) {
            this.seguradoras[index] = { ...this.seguradoras[index], ...seguradora }
          }
        } else {
          // Criar nova
          // const response = await fetch('/api/seguradoras', {
          //   method: 'POST',
          //   body: JSON.stringify(seguradora)
          // })
          // const novaSeg = await response.json()
          const novaSeg = {
            ...seguradora,
            id: Date.now(), // temporário, será gerado pelo backend
            ativo: true
          }
          this.seguradoras.push(novaSeg as Seguradora)
        }
      } catch (err) {
        this.error = 'Erro ao salvar seguradora'
        throw err
      } finally {
        this.loading = false
      }
    },

    async toggleStatus(id: number) {
      const seguradora = this.seguradoras.find(s => s.id === id)
      if (seguradora) {
        try {
          // await fetch(`/api/seguradoras/${id}/toggle-status`, { method: 'POST' })
          seguradora.ativo = !seguradora.ativo
        } catch (err) {
          this.error = 'Erro ao alterar status'
          console.error(err)
        }
      }
    }
  }
}) 