import styled, { css } from "styled-components";

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem; // para se caso o usuário diminuir a tela, o conteúdo não ficar grudado nos cantos

  display: grid;
  grid-template-columns: repeat(3, 1fr); // vamos querer três colunas dentro do grid todas do mesmo tamanho
  gap: 2rem; // espaçamento entre colunas
  margin-top: -5rem; // isso é para que o componente atravesse o header acima
`

interface SummaryCardProps { // vamos definir que o componente SumarryCard pode receber uma propriedade chamada variant
  variant?: 'green'; // variant não é uma propriedade obrigatória '?'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background-color: ${props => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => props.theme['gray-300']}
  }

  strong {
    display: block; // vamos colocar block porque por padrão strong é inline e não conseguimos colocar margin vertical em tag inline
    margin-top: 1rem;
    font-size: 2rem; 
  }

  ${props => props.variant === 'green' && css`
    background: ${props.theme['green-700']};
  `} // vamos criar uma estilização condicional - vamos acessar props do component e verificar se variant é igual a 'green', se for vai entrar nas chaves
`