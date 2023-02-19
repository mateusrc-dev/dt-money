import styled from 'styled-components'

export const Container = styled.div`
  overflow: auto;
  width: 100%;
  height: 100vh;
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme['gray-100']};
    border-radius: 10px;
    width: 0px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme['gray-400']};
    border-radius: 0px;
    width: 0px;
    border-radius: 10px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
`

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0; // vamos colocar uma margem acima pra distanciar do Summary
  padding: 0 1.5rem; // para se caso o usuário diminuir a tela, o conteúdo não ficar grudado nos cantos
`

export const TransactionsTable = styled.table`
  // novamente criando componentes e evitando cascatas
  width: 100%;
  border-collapse: separate; // quando usamos essa propriedade 'separate' podemos usar a propriedade border-spacing
  border-spacing: 0 0.5rem; // espaço nas: laterais; vertical
  margin-top: 1.5rem; // margem em relação ao formulário de busca

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      // vamos estilizar a primeira td de cada linha para colocar um border radius nos cantos
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      // vamos estilizar o último td de cada linha para colocar um border radius nos cantos
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

interface PriceHighLightProps {
  // vamos passar uma propriedade indicando se vai ser uma entrada ou saída
  variant: 'income' | 'outcome'
}

export const PriceHighLight = styled.span<PriceHighLightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 0;
  color: ${(props) => props.theme['red-300']};
  font-size: 1.5rem;
  cursor: pointer;
`
