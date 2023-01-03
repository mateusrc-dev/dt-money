// este vai ser o arquivo 'root' da nossa aplicação

import { ThemeProvider } from "styled-components"; // provider de contexto do styled-components que vai prover o tema para os components dentro dele
import { Transactions } from "./pages/Transactions";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default"; // nosso tema padrão

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Transactions />
      <GlobalStyle />
    </ThemeProvider>
  );
}
