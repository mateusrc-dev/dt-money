import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog"; // importando o nosso modal da biblioteca radix - tudo da biblioteca vai ficar dentro de Dialog - podemos desestruturar e pegar somente o 'Root'

export const Overlay = styled(Dialog.Overlay)`
  // vamos estilizar o Dialog.Overlay
  position: fixed; // é melhor usar o fixed porque ele fica na mesma posição na tela mesmo com scroll
  width: 100vw; // valores para ocupar toda a tela
  height: 100vh;
  inset: 0; // é o mesmo que setar bottom, top, left, right 0
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)` // vamos estilizar o Dialog.Content
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme["gray-800"]};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(
    -50%,
    -50%
  ); // para o conteúdo ficar no meio - o translate é em relação ao tamanho do conteúdo

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme["gray-900"]};
      color: ${(props) => props.theme["gray-300"]};
      padding: 1rem;
      &::placeholder {
        color: ${props => props.theme["gray-500"]};
      }
    }
    button[type="submit"] { // vamos especificar qual o tipo do botão que vamos estilizar
      height: 58px;
      border: 0;
      background: ${props => props.theme["green-500"]};
      color: ${props => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.5rem;
      cursor: pointer;
      &:hover {
        background: ${props => props.theme["green-700"]};
        transition: background 0.5s;
      }
    }
  }
`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0; // para a caixinha do focus ficar do tamanho correto
  cursor: pointer;
  color: ${props => props.theme['gray-500']};
`