import { Cabecalho } from "./Cabecalho/Cabecalho";
import { Corpo } from "./Corpo/Corpo";

export function Tabela({ tipoLista }) {
  return tipoLista === "Estoque" ? (
    <table className="table-produtos">
      <thead>
        <Cabecalho tipoLista="Estoque" />
      </thead>
      <tbody>
        <Corpo tipoLista="Estoque" />
      </tbody>
    </table>
  ) : (
    <>
      <table className="table-funcionarios">
        <thead>
          <Cabecalho tipoLista="Funcionario" />
        </thead>
        <tbody>
          <Corpo tipoLista="Funcionario" />
        </tbody>
      </table>
    </>
  );
}
