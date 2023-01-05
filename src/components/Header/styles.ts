import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  // vamos criar o componente com os conteúdos que vão ficar centralizados
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem; // para se caso o usuário diminuir a tela, o conteúdo não ficar grudado nos cantos
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NewTransactionButton = styled.button`
  // lembrando que é sempre bom criar novos componentes em vez de fica usando cascata
  height: 50px;
  border: 0;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme['green-700']};
    transition: background-color 0.5s; // colocando aqui a transição o efeito de transição só vai ocorrer no início
  }
`
