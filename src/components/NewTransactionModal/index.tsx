import * as Dialog from "@radix-ui/react-dialog"; // importando o nosso modal da biblioteca radix - tudo da biblioteca vai ficar dentro de Dialog - podemos desestruturar e pegar somente o 'Root'
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

export function NewTransactionModal() {
  // esse componente vai ter o conteúdo do modal
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
        <form action="">
          <input type="text" placeholder="Descrição" required />
          <input type="number" placeholder="Preço" required />
          <input type="text" placeholder="Categoria" required />

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

          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
