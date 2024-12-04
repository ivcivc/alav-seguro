export interface Usuario {
  id: string
  nome: string
  email: string
  cargo: string
  ativo: boolean
  permissoes: Permissao[]
  createdAt: Date
  updatedAt: Date
}

export interface Permissao {
  id: string
  nome: string
  descricao: string
  chave: string // exemplo: 'criar_apolice', 'editar_usuario', etc.
} 