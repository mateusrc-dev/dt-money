import * as Dialog from "@radix-ui/react-dialog"; // importando o nosso modal da biblioteca radix - tudo da biblioteca vai ficar dentro de Dialog - podemos desestruturar e pegar somente o que desejarmos
import {
  Content,
  Overlay,
  CloseButton,
  TransactionType,
  TransactionTypeButton,
} from "./styles";
import { X } from "phosphor-react";
import { ArrowCircleUp } from "phosphor-react";
import { ArrowCircleDown } from "phosphor-react";
import * as zod from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  //type: zod.enum(['income', 'outcome']), // enum é usado quando temos uma enumeração, opções
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  // esse componente vai ter o conteúdo do modal
  const { register, handleSubmit, formState: {isSubmitting} } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000)) // para simular uma lentidão
    console.log(data)
  }
  return (
    <Dialog.Portal>
      {/*com Portal podemos fazer com que o conteúdo dentro dele vá pra outro lugar da aplicação - não faz sentido o modal pertencer ao Header da aplicação, pois o modal fica sobreposto a aplicação - Portal coloca o conteúdo do modal fora de todas as 'divs' */}
      <Overlay /> {/* fundo preto em torno do modal */}
      <Content>
        {/*aqui é onde vai ficar o conteúdo do modal */}
        <Dialog.Title>Nova transação</Dialog.Title>
        {/*para colocar o título - radix utiliza para anunciar o leitor de tela que tipo de modal foi aberto */}
        <CloseButton>
          <X size={24} />
        </CloseButton>
        {/*para colocar o botão de fechar */}
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input type="text" placeholder="Descrição" required {...register('description')} />
          <input type="number" placeholder="Preço" required {...register('price', {valueAsNumber: true})} /> {/*'valueAsNumber: true' é para o número retornado pelo input ser do tipo number*/}
          <input type="text" placeholder="Categoria" required {...register('category')} />

          <TransactionType>
            <TransactionTypeButton variant="income" value="income"> {/*colocar o value se torna obrigatório quando usamos o RadioGroup na estilização - indica o valor do item no formulário quando ele for submetido */}
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeButton>
            <TransactionTypeButton variant="outcome" value="outcome">
              <ArrowCircleDown size={24} />
              Saída
            </TransactionTypeButton>
          </TransactionType>

          <button type="submit" disabled={isSubmitting}>Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
