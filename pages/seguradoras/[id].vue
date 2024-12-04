<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold dark:text-white">
        {{ isNew ? 'Nova Seguradora' : 'Editar Seguradora' }}
      </h1>
      <button 
        @click="router.push('/seguradoras')"
        class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
      >
        Voltar
      </button>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <form @submit.prevent="salvar" class="space-y-6">
        <!-- Nome -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome</label>
          <input 
            v-model="form.nome"
            type="text"
            required
            class="w-full px-3 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
        </div>

        <!-- CNPJ -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CNPJ</label>
          <input 
            v-model="form.cnpj"
            v-mask="'##.###.###/####-##'"
            type="text"
            required
            placeholder="00.000.000/0000-00"
            @input="formatarCNPJ"
            class="w-full px-3 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
          <span v-if="cnpjError" class="text-sm text-red-600 dark:text-red-400 mt-1 block">
            {{ cnpjError }}
          </span>
        </div>

        <!-- Telefones -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Telefones
          </label>
          
          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div class="space-y-4">
              <!-- Lista de Telefones -->
              <div v-for="(telefone, index) in form.telefones" :key="index" 
                   class="p-4 bg-white dark:bg-gray-800 rounded-lg space-y-3">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <!-- Número -->
                  <div>
                    <label class="block text-xs text-gray-500 dark:text-gray-400">Número</label>
                    <input 
                      v-model="telefone.numero"
                      v-mask="telefonePattern"
                      type="text"
                      required
                      placeholder="(00) 00000-0000"
                      @input="() => formatarTelefone(telefone)"
                      class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                  </div>

                  <!-- Tipo -->
                  <div>
                    <label class="block text-xs text-gray-500 dark:text-gray-400">Tipo</label>
                    <select 
                      v-model="telefone.tipo"
                      required
                      class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option v-for="tipo in TIPOS_TELEFONE" :key="tipo" :value="tipo">
                        {{ tipo }}
                      </option>
                    </select>
                  </div>

                  <!-- Contato -->
                  <div>
                    <label class="block text-xs text-gray-500 dark:text-gray-400">Contato</label>
                    <input 
                      v-model="telefone.contato"
                      type="text"
                      placeholder="Nome do contato"
                      class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                  </div>
                </div>

                <!-- Botão Remover -->
                <div class="flex justify-end">
                  <button 
                    type="button"
                    @click="removerTelefone(index)"
                    class="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Remover telefone
                  </button>
                </div>
              </div>

              <!-- Botão Adicionar Telefone -->
              <button 
                type="button"
                @click="adicionarTelefone"
                class="w-full px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700"
              >
                + Adicionar Telefone
              </button>
            </div>
          </div>
        </div>

        <!-- Regras de Comissão -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Regras de Comissão
          </label>
          
          <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div class="space-y-4">
              <!-- Lista de Regras -->
              <div v-for="(regra, index) in form.regrasComissao" :key="index" 
                   class="p-4 bg-white dark:bg-gray-800 rounded-lg space-y-3">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <!-- Ramo -->
                  <div>
                    <label class="block text-xs text-gray-500 dark:text-gray-400">Ramo</label>
                    <select 
                      v-model="regra.ramo"
                      required
                      class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option v-for="ramo in RAMOS" :key="ramo" :value="ramo">
                        {{ ramo }}
                      </option>
                    </select>
                  </div>

                  <!-- Tipo de Regra -->
                  <div>
                    <label class="block text-xs text-gray-500 dark:text-gray-400">Regra</label>
                    <select 
                      v-model="regra.tipoRegra"
                      required
                      class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option v-for="tipo in TIPOS_REGRA" :key="tipo" :value="tipo">
                        {{ tipo }}
                      </option>
                    </select>
                  </div>

                  <!-- Número de Parcelas -->
                  <div v-if="regra.tipoRegra !== 'Em qualquer nr de parcelas'">
                    <label class="block text-xs text-gray-500 dark:text-gray-400">Número de Parcelas</label>
                    <input 
                      v-model="regra.numeroParcelas"
                      type="number"
                      min="1"
                      required
                      class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                  </div>

                  <!-- Tipo de Recebimento -->
                  <div>
                    <label class="block text-xs text-gray-500 dark:text-gray-400">Recebimento</label>
                    <select 
                      v-model="regra.tipoRecebimento"
                      required
                      class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option v-for="tipo in TIPOS_RECEBIMENTO" :key="tipo" :value="tipo">
                        {{ tipo }}
                      </option>
                    </select>
                  </div>

                  <!-- Percentual -->
                  <div>
                    <label class="block text-xs text-gray-500 dark:text-gray-400">Percentual (%)</label>
                    <input 
                      v-model="regra.percentualComissao"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      required
                      class="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                  </div>
                </div>

                <!-- Botão Remover -->
                <div class="flex justify-end">
                  <button 
                    type="button"
                    @click="removerRegra(index)"
                    class="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Remover regra
                  </button>
                </div>
              </div>

              <!-- Botão Adicionar Regra -->
              <button 
                type="button"
                @click="adicionarRegra"
                class="w-full px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700"
              >
                + Adicionar Regra
              </button>
            </div>
          </div>
        </div>

        <!-- Botões -->
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="router.push('/seguradoras')"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeguradoraStore } from '~/stores/seguradora'
import { useRouter, useRoute } from 'vue-router'
import { mask } from 'vue-the-mask'

const router = useRouter()
const route = useRoute()
const store = useSeguradoraStore()
const cnpjError = ref('')

// Enums
const TIPOS_TELEFONE = [
  'celular',
  'sms',
  'fixo',
  'trabalho',
  'casa',
  'whatsapp',
  'outros'
] as const

const RAMOS = [
  'Automóvel',
  'Incêndio',
  'Vida',
  'Residencial',
  'Empresarial',
  'Transporte',
  'Responsabilidade Civil'
] as const

const TIPOS_REGRA = [
  'Em qualquer nr de parcelas',
  'maior',
  'menor'
] as const

const TIPOS_RECEBIMENTO = [
  'Única vez',
  'Parcelado'
] as const

const isNew = computed(() => route.params.id === 'nova')

// Estado do formulário
const form = reactive({
  nome: '',
  cnpj: '',
  telefones: [] as Telefone[],
  regrasComissao: [] as RegraComissao[]
})

// Funções auxiliares
const telefonePattern = computed(() => '(##) #####-####')

const formatarTelefone = (telefone: Telefone) => {
  let valor = telefone.numero.replace(/\D/g, '')
  if (valor.length > 11) valor = valor.slice(0, 11)
  
  if (valor.length === 11) {
    telefone.numero = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
  } else if (valor.length === 10) {
    telefone.numero = valor.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
  } else {
    telefone.numero = valor
  }
}

const formatarCNPJ = (event: Event) => {
  const input = event.target as HTMLInputElement
  let valor = input.value.replace(/\D/g, '')
  
  if (valor.length > 14) {
    valor = valor.slice(0, 14)
  }

  form.cnpj = valor.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  )

  // Validar CNPJ
  if (valor.length === 14) {
    if (!validarCNPJ(valor)) {
      cnpjError.value = 'CNPJ inválido'
    } else {
      cnpjError.value = ''
    }
  } else {
    cnpjError.value = ''
  }
}

const adicionarTelefone = () => {
  form.telefones.push({
    numero: '',
    tipo: TIPOS_TELEFONE[0],
    contato: ''
  })
}

const removerTelefone = (index: number) => {
  form.telefones.splice(index, 1)
}

const adicionarRegra = () => {
  form.regrasComissao.push({
    ramo: RAMOS[0],
    tipoRegra: TIPOS_REGRA[0],
    numeroParcelas: 1,
    tipoRecebimento: TIPOS_RECEBIMENTO[0],
    percentualComissao: 0
  })
}

const removerRegra = (index: number) => {
  form.regrasComissao.splice(index, 1)
}

// Carregar dados se for edição
onMounted(async () => {
  if (!isNew.value) {
    const seguradora = store.seguradoras.find(s => s.id === Number(route.params.id))
    if (seguradora) {
      form.nome = seguradora.nome
      form.cnpj = seguradora.cnpj
      form.telefones = [...(seguradora.telefones || [])]
      form.regrasComissao = seguradora.regrasComissao ? [...seguradora.regrasComissao] : []
    }
  }
})

const salvar = async () => {
  try {
    if (cnpjError.value) {
      return // Não salva se CNPJ for inválido
    }
    
    await store.salvarSeguradora({
      ...(isNew.value ? {} : { id: Number(route.params.id) }),
      ...form
    })
    router.push('/seguradoras')
  } catch (err) {
    console.error('Erro ao salvar:', err)
    // Aqui você pode adicionar um tratamento de erro mais elaborado
  }
}

// Função de validação de CNPJ
const validarCNPJ = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]/g, '')

  if (cnpj.length !== 14) return false

  // Elimina CNPJs inválidos conhecidos
  if (/^(\d)\1+$/.test(cnpj)) return false

  // Validação do primeiro dígito verificador
  let soma = 0
  let peso = 2
  for (let i = 11; i >= 0; i--) {
    soma += parseInt(cnpj.charAt(i)) * peso
    peso = peso === 9 ? 2 : peso + 1
  }
  let digito = 11 - (soma % 11)
  if (digito > 9) digito = 0
  if (parseInt(cnpj.charAt(12)) !== digito) return false

  // Validação do segundo dígito verificador
  soma = 0
  peso = 2
  for (let i = 12; i >= 0; i--) {
    soma += parseInt(cnpj.charAt(i)) * peso
    peso = peso === 9 ? 2 : peso + 1
  }
  digito = 11 - (soma % 11)
  if (digito > 9) digito = 0
  if (parseInt(cnpj.charAt(13)) !== digito) return false

  return true
}
</script> 