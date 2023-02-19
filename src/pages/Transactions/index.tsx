import { Trash } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import {
  Button,
  Container,
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })
  const deleteTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransaction
    },
  )

  function handleDeleteTransaction(transactionId: number) {
    deleteTransaction(transactionId)
  }

  return (
    <Container>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
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
      </TransactionsContainer>
    </Container>
  )
}
