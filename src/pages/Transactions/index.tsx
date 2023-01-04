import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

interface Transaction {
  // é sempre importante tipar o estado, principalmente se ele for array ou objeto
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // vamos criar um estado para colocar os dados da API
  // vamos usar a API de fetch do navegador - vamos passar o endereço de onde está a nossa API - fetch vai nos devolver os dados 'then' - é uma promise - demora um tempo para executar - lembrando que colocamos um delay - sempre que esse componente for renderizado novamente o fetch vai ser executado - por isso vamos usar o useEffect com o array de dependências vazio para fetch ser executado apenas uma vez - vamos ter que converter a Stream (forma de receber dados particionados da requisição) para outro formato (no caso vai ser json) - React não permite usar async diretamente no useEffect, temos que criar uma função dentro
  useEffect(() => {
    async function Transactions() {
      // podemos colocar essa função fora do useEffect se desejarmos
      const response = await fetch("http://localhost:3333/transactions"); // vamos esperar a resposta da requisição
      const data = await response.json(); // vamos esperar a transformação dos dados da requisição para json
      setTransactions(data);
    }
    Transactions();
  }, []);

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighLight variant={transaction.type}>
                      R${transaction.price}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
