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

export const ContainerWarning = styled.div`
  background: ${(props) => props.theme['gray-700']};
  padding: 1.25rem 2rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  font-size: 2rem;
  font-style: italic;
  svg {
    font-size: 6rem;
  }
`

export const Pages = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
`

interface PageProps {
  active: boolean
}

export const Page = styled.button<PageProps>`
  background: ${(props) =>
    props.active === true ? props.theme['green-500'] : props.theme['gray-700']};
  color: ${(props) => props.theme.white};
  border-radius: 6px;
  width: 3rem;
  height: 3.5rem;
  border: 0;
  cursor: pointer;
  &:hover {
    filter: brightness(0.7);
  }
`

export const Loading = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  background: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme.white};
  font-style: italic;
`
