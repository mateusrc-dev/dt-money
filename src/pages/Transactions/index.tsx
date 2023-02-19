import { Trash, Warning } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import {
  Button,
  Container,
  ContainerWarning,
  Loading,
  Page,
  Pages,
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const [count, setCount] = useState(0)
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const allTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.allTransactions
  })

  const deleteTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransaction
    },
  )

  const loading = useContextSelector(TransactionsContext, (context) => {
    return context.loading
  })

  const page = useContextSelector(TransactionsContext, (context) => {
    return context.page
  })

  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  function handleDeleteTransaction(transactionId: number) {
    deleteTransaction(transactionId)
  }

  useEffect(() => {
    function handlePages() {
      let num = 1
      for (let i = 1; allTransactions.length > i; i++) {
        if (i % 5 === 0) {
          num += 1
        }
      }
      return setCount(num)
    }
    handlePages()
  }, [allTransactions.length])

  function handlePage(page: number) {
    fetchTransactions({ page })
  }

  return (
    <Container>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions &&
              transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td width="50%">{transaction.description}</td>
                    <td>
                      <PriceHighLight variant={transaction.type}>
                        {' '}
                        {/* se o type for 'outcome' vai ser renderizado um sinal de menos */}
                        {transaction.type === 'outcome' && '- '}
                        {priceFormatter.format(transaction.price)}
                      </PriceHighLight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>
                      {dateFormatter.format(new Date(transaction.createdAt))}
                    </td>
                    <td>
                      <Button
                        title="excluir transação"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        <Trash />
                      </Button>
                    </td>
                  </tr>
                )
                /* createdAt vem da nossa API como uma string, por isso precisamos converter ele pra uma data */
              })}
          </tbody>
        </TransactionsTable>
        {transactions.length === 0 ? (
          <ContainerWarning>
            <Warning />
            Você ainda não caiu nenhuma transação nessa página!
          </ContainerWarning>
        ) : null}
        <Pages>
          {Array.from(Array(count).keys()).map((day) => {
            return (
              <Page
                onClick={() => handlePage(day + 1)}
                key={day}
                active={day + 1 === page}
              >
                {day + 1}
              </Page>
            )
          })}
        </Pages>
      </TransactionsContainer>
      {loading && <Loading>Carregando...</Loading>}
    </Container>
  )
}
