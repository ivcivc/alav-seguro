import { defineStore } from 'pinia'

export const useApoliceStore = defineStore('apolices', {
  state: () => ({
    apolices: [] as Apolice[],
    loading: false,
    error: null as string | null,
  }),
  
  actions: {
    async fetchApolices() {
      this.loading = true
      try {
        // Implementar chamada à API
        this.loading = false
      } catch (error) {
        this.error = 'Erro ao carregar apólices'
        this.loading = false
      }
    },
    
    async createApolice(apolice: Partial<Apolice>) {
      // Implementar criação
    }
  }
})