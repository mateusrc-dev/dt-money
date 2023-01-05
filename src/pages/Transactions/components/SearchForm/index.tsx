import { SearchFormContainer } from './styles'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form' // para criar o formulário
import * as zod from 'zod' // vamos importar o zod pra criar o schema
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'

const searchFormSchema = zod.object({
  // criando nosso schema - formato do objeto de dados que vamos receber quando realizamos o submit do formulário
  query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof searchFormSchema> // criando a tipagem do formulário - vamos usar infer pra inferir a tipagem de searchFormSchema

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext)
  const { register, handleSubmit, formState } = useForm<SearchFormInputs>({
    // vamos dizer qual a tipagem do nosso formulário
    resolver: zodResolver(searchFormSchema), // vamos dizer qual schema do nosso formulário
  })

  const { isSubmitting } = formState // isSubmitting retorna true ou false dizendo se o formulário está enviando as informações ou não

  async function handleSearchTransactions(data: SearchFormInputs) {
    // vamos colocar essa função dentro de handleSubmit - data vai ser os valores dos campos do formulário
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      {/* lembrando que esse componente é uma tag 'form', por isso podemos colocar onSubmit nele */}
      <input
        type="text"
        placeholder="Busque por transações!"
        {...register('query')}
      />
      {/* no register vamos dizer qual o nome do campo - regiter tem os métodos - onChange, onClick, onSubmit */}
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        <span>Buscar</span>
      </button>
    </SearchFormContainer>
  )
}
