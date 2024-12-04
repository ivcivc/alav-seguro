import { defineStore } from 'pinia'

interface User {
  id: number
  nome: string
  email: string
  cargo: string
}

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        // Implementar chamada à API de login
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        /*if (!response.ok) {
          throw new Error('Falha na autenticação')
        }

        const data = await response.json()*/
        const data = {
            user: {
                id: 1,
                nome: 'Ivan',
                email: 'ivan@gmail.com',
                cargo: 'Administrador'
            },
            token: '1234567890'
        }       
        this.user = data.user
        this.token = data.token

        // Salvar token no localStorage
        localStorage.setItem('token', data.token)
      } catch (error) {
        console.error('Erro no login:', error)
        throw error
      }
    },

    async logout() {
      try {
        // Remover dados de autenticação
        this.user = null
        this.token = null
        localStorage.removeItem('token')
        
        // Opcional: chamada à API de logout
        // await fetch('/api/logout', {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': `Bearer ${this.token}`
        //   }
        // })
      } catch (error) {
        console.error('Erro no logout:', error)
      }
    },

    // Verificar se usuário está autenticado
    checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        // Opcionalmente, buscar dados do usuário
        this.fetchUserData()
      }
    },

    // Buscar dados do usuário
    async fetchUserData() {
      try {
        const response = await fetch('/api/user', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
        
        if (!response.ok) throw new Error('Falha ao buscar dados do usuário')
        
        const userData = await response.json()
        this.user = userData
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error)
        this.logout()
      }
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.user?.nome || 'Usuário'
  }
}) 