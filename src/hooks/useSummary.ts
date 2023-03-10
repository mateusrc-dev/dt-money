import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { useMemo } from 'react'

export function useSummary() {
  const allTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.allTransactions
  })
  // vamos usar o método reduce -> permite percorrer um array e reduzir esse array a uma nova estrutura de dados - nesse caso vamos converter o array de transactions em um objeto com a seguinte estrutura: {income: 0, outcome: 0, total: 0}
  const summary = useMemo(() => {
    // ao usar useMemo, a variável summary só vai ser recriada quando o transactions mudar, antes ela era recriada toda vez que o useSummary fosse renderizado de novo
    return allTransactions.reduce(
      (acc, transaction) => {
        // dessa função recebemos como parâmetro: 1. resumo atual (accumulator nada mais é que a estrutura inicial abaixo - vamos fazer todas as operações nele - é o que será retornado no final); 2. no segundo recebemos cada transaction da iteração
        if (transaction.type === 'income') {
          acc.income += transaction.price // se o tipo do transaction corrente na iteração for 'income' vai somar o valor de price do transaction corrente em acc.income
          acc.total += transaction.price // como é income, vai ser somado o price do transaction corrente da iteração em acc.total
        } else {
          acc.outcome += transaction.price
          acc.total -= transaction.price
        }

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    ) // passamos como parâmetro do reduce: 1. uma função; 2. a estrutura de dados inicial que vamos começar
  }, [allTransactions])

  return summary // vamos retornar o summary com o valor retornado pelo reduce
}
