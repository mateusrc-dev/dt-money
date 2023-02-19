import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  // é sempre importante tipar o estado, principalmente se ele for array ou objeto
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  // tipagem da nova transação - vamos criar novamnte a tipagem para desaclopar o context do componente NewTransactionModal
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface fetchTransactionsProps {
  page?: number
  query?: string
}

interface TransactionsContextType {
  // vamos informar quais informações vamos armazenar/retornar desse contexto
  transactions: Transaction[]
  allTransactions: Transaction[]
  fetchTransactions: (data: fetchTransactionsProps) => Promise<void> // função é assíncrona, por isso o Promise
  fetchAllTransactions: () => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  deleteTransaction: (transactionId: number) => Promise<void>
  loading: boolean
  page: number
}

export const TransactionsContext = createContext<TransactionsContextType>(
  {} as TransactionsContextType,
) // vamos usar o 'as' para não precisar ficar colocando cada propriedade que adicionamos no contexto dentro do createContext

interface TransactionsProviderProps {
  children: ReactNode // ReactNode é qualquer elemento válido - hmtl, componente, etc.
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  // esse componente vai retornar o nosso Provider com as propriedades do contexto
  const [transactions, setTransactions] = useState<Transaction[]>([]) // vamos criar um estado para colocar os dados da API
  // vamos usar a API de fetch do navegador - vamos passar o endereço de onde está a nossa API - fetch vai nos devolver os dados 'then' - é uma promise - demora um tempo para executar - lembrando que colocamos um delay - sempre que esse componente for renderizado novamente o fetch vai ser executado - por isso vamos usar o useEffect com o array de dependências vazio para fetch ser executado apenas uma vez - vamos ter que converter a Stream (forma de receber dados particionados da requisição) para outro formato (no caso vai ser json) - React não permite usar async diretamente no useEffect, temos que criar uma função dentro
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([])
  const fetchTransactions = useCallback(
    async (data: fetchTransactionsProps) => {
      const { query, page } = data
      // vamos deixar a query como opcional porque no primeiro carregamento não haverá busca
      // podemos colocar essa função fora do useEffect se desejarmos
      if (page !== undefined) {
        setPage(page)
      }
      setLoading(true)
      const response = await api.get('transactions', {
        // requisição pelo axios (não precisamos colocar toda vez a url)
        params: {
          // são os nossos searchParams
          _sort: 'createdAt', // vamos ordenar por esse campo (informações de como fazer isso está no github do json-server)
          _order: 'desc', // a ordem vai ser decrescente
          _limit: 5,
          _page: page,
          q: query,
        },
      })
      setTransactions(response.data)
      setLoading(false)
    },
    [],
  )
  const fetchAllTransactions = useCallback(async () => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
      },
    })
    setAllTransactions(response.data)
  }, [])
  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      // vamos criar essa função aqui porque vamos usar o 'response' para atualizar o estado 'transactions' e a lista atualizar automaticamente
      setLoading(true)
      const { category, description, price, type } = data
      await api.post('transactions', {
        // usando método http post para criar algo - transactions é a rota
        // aqui ficar o corpo da requisição, é os dados que vamos enviar para serem inseridos em transactions (que é uma entidade) - não precisamos enviar o id (o json-server cria sozinho)
        category,
        description,
        price,
        type,
        createdAt: new Date(), // no backend na vida real não é preciso enviar essa data porque o backend gera automaticamente
      })
      fetchTransactions({ page })
      fetchAllTransactions()
      setLoading(false)
    },
    [fetchTransactions, page, fetchAllTransactions], // esse array de dependencias desse hook funciona como a dependencia do useEffect, a função é criada em memória caso a variável incluída na dependencia mudar, se a dependencia ficar vazia a função nunca vai ser criada em memória - se essa função depende de uma informação de fora, ela precisa ser colocada no array de dependencias
  )
  const deleteTransaction = useCallback(
    async (transactionId: number) => {
      setLoading(true)
      await api.delete(`transactions/${transactionId}`)
      fetchTransactions({ page })
      fetchAllTransactions()
      setLoading(false)
    },
    [page, fetchTransactions, fetchAllTransactions],
  )
  useEffect(() => {
    fetchTransactions({ page: 1 })
    fetchAllTransactions()
  }, [fetchTransactions, fetchAllTransactions]) // useEffect só vai ser disparado uma vez porque fetchTransactions só vai ser renderizada uma vez (pois ela não tem dependências) - vamos precisar colocar fetchTransactions como dependencia porque agora estamos usando useCallback
  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        allTransactions,
        fetchTransactions,
        fetchAllTransactions,
        createTransaction,
        deleteTransaction,
        loading,
        page,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
