interface Usuario {
    id: string
    nome: string
    email: string
    permissoes: string[]
  }
  
  interface Seguradora {
    id: string
    nome: string
    cnpj: string
    regrasPagamento: {
      parcelasMaximas: number
      parcelasCorretagem: number
    }[]
  }
  
  interface Segurado {
    id: string
    nome: string
    apelido?: string
    dataNascimento: Date
    contatos: {
      tipo: 'email' | 'telefone' | 'celular'
      valor: string
    }[]
    endereco: {
      logradouro: string
      numero: string
      complemento?: string
      bairro: string
      cidade: string
      estado: string
      cep: string
    }
  }
  
  interface Apolice {
    id: string
    tipo: 'vida' | 'incendio' | 'veiculo' | 'frota'
    seguradoId: string
    seguradoraId: string
    vigenciaInicio: Date
    vigenciaFim: Date
    coberturas: {
      tipo: string
      valor: number
    }[]
    pagamento: {
      valorTotal: number
      parcelas: number
    }
    comissao: {
      percentual: number
      valorTotal: number
      parcelas: number
    }
    veiculo?: {
      placa: string
      marca: string
      modelo: string
      ano: number
      chassi: string
    }
  }