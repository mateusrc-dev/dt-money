import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  // é sempre importante tipar o estado, principalmente se ele for array ou objeto
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionsContextType {
  // vamos informar quais informações vamos armazenar/retornar desse contexto
  transactions: Transaction[];
  fetchTransactions: (data?: string) => Promise<void> //função é assíncrona, por isso o Promise
}

export const TransactionsContext = createContext<TransactionsContextType>(
  {} as TransactionsContextType
); //vamos usar o 'as' para não precisar ficar colocando cada propriedade que adicionamos no contexto dentro do createContext

interface TransactionsProviderProps {
  children: ReactNode; // ReactNode é qualquer elemento válido - hmtl, componente, etc.
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  // esse componente vai retornar o nosso Provider com as propriedades do contexto
  const [transactions, setTransactions] = useState<Transaction[]>([]); // vamos criar um estado para colocar os dados da API
  // vamos usar a API de fetch do navegador - vamos passar o endereço de onde está a nossa API - fetch vai nos devolver os dados 'then' - é uma promise - demora um tempo para executar - lembrando que colocamos um delay - sempre que esse componente for renderizado novamente o fetch vai ser executado - por isso vamos usar o useEffect com o array de dependências vazio para fetch ser executado apenas uma vez - vamos ter que converter a Stream (forma de receber dados particionados da requisição) para outro formato (no caso vai ser json) - React não permite usar async diretamente no useEffect, temos que criar uma função dentro
  async function fetchTransactions(query?: string) { //vamos deixar a query como opcional porque no primeiro carregamento não haverá busca
    // podemos colocar essa função fora do useEffect se desejarmos
    const response = await api.get('transactions', { //requisição pelo axios (não precisamos colocar toda vez a url)
      params: { // são os nossos searchParams
        q: query,
      }
    })
    setTransactions(response.data);
  }
  useEffect(() => { 
    fetchTransactions();
  }, []);
  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
