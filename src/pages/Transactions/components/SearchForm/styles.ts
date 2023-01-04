import styled from "styled-components";

export const SearchFormContainer = styled.form`
  // dentro desse componente vai ter um input e um button - por isso a tag form
  display: flex;
  gap: 1rem; // espaçamento entre input e button
  input {
    flex: 1; // para ocupar o espaço todo
    border-radius: 6px;
    border: 0;
    background-color: ${(props) => props.theme["gray-900"]};
    color: ${(props) => props.theme["gray-300"]};
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme["gray-500"]};
    }
  }
  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: transparent;
    border: 1px solid ${(props) => props.theme["green-300"]};
    color: ${(props) => props.theme["green-300"]};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
    &:not(:disabled):hover {
      background: ${(props) => props.theme["green-500"]};
      border-color: ${(props) => props.theme["green-500"]};
      color: ${(props) => props.theme.white};
      transition: all 0.5s;
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;
