import * as Dialog from '@radix-ui/react-dialog' // importando o nosso modal da biblioteca radix - tudo da biblioteca vai ficar dentro de Dialog - podemos desestruturar e pegar somente o que desejarmos
import {
  Content,
  Overlay,
  CloseButton,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import { X, ArrowCircleUp, ArrowCircleDown } from 'phosphor-react'

import * as zod from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']), // enum é usado quando temos uma enumeração, opções
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  // esse componente vai ter o conteúdo do modal
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  ) // quando usamos useContextSelector, além do contexto, precisamos passar uma função no parâmetro - vamos colocar no return quais informações do contexto queremos observar mudar, e como vamos retornar uma única função não precisamos mais fazer uma desestruturação
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control, // para fazer o controle do value do RadioGroup
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    createTransaction(data)
    reset() // para zerar as informações do formulário
  }
  return (
    <Dialog.Portal>
      {/* com Portal podemos fazer com que o conteúdo dentro dele vá pra outro lugar da aplicação - não faz sentido o modal pertencer ao Header da aplicação, pois o modal fica sobreposto a aplicação - Portal coloca o conteúdo do modal fora de todas as 'divs' */}
      <Overlay /> {/* fundo preto em torno do modal */}
      <Content>
        {/* aqui é onde vai ficar o conteúdo do modal */}
        <Dialog.Title>Nova transação</Dialog.Title>
        {/* para colocar o título - radix utiliza para anunciar o leitor de tela que tipo de modal foi aberto */}
        <CloseButton>
          <X size={24} />
        </CloseButton>
        {/* para colocar o botão de fechar */}
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          {/* 'valueAsNumber: true' é para o número retornado pelo input ser do tipo number */}
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />
          <Controller // Controller é um componente que vem do react-hook-form
            control={control}
            name="type" // aqui é o nome do campo
            render={({ field }) => {
              // do render podemos pegar propriedades - field dentro de props tem os eventos para conseguir alterar o valor do campo - tem o onChange - função que salva o valor dentro do formulário - tem também o value (valor atual do campo)
              return (
                // essa função retorna o conteúdo relacionado a esse campo - a forma de inserir o campo type no formulário
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {' '}
                  {/* vamos chamar a função onChange de field quando o valor de onValueChange mudar (essa função retorna qual item foi selecionado e muda em tempo real de acordo com a seleção) - vamos colocar a informação do onChange de field no value */}
                  <TransactionTypeButton variant="income" value="income">
                    {/* colocar o value se torna obrigatório quando usamos o RadioGroup na estilização - indica o valor do item no formulário quando ele for submetido */}
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
