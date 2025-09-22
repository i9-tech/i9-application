import "./Cozinha.css";

import { useEffect, useState } from "react";
import Comanda from "../../components/ComandaFinal/Comanda/Comanda";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import { ENDPOINTS } from "../../utils/endpoints";
import api from "../../provider/api";
import { getFuncionario, getToken } from "../../utils/auth";
import { DateRangePicker } from "../../components/Calendario/DateRangePicker";

export function Cozinha() {
  const funcionario = getFuncionario();
  const token = getToken();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    api
      .get(
        `${ENDPOINTS.VENDA_PRATOS_VENDIDOS_DIARIO}/${funcionario.empresaId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log("Valores de venda recuperados: ", res.data);
        setPedidos(res.data);
      })
      .catch((err) => {
        console.log("Erro ao buscar valores de venda: ", err);
      });
  }, [token, funcionario.empresaId]);

  const atualizarComandas = (id) => {
    setPedidos((item) => item.filter((pedidos) => pedidos.id !== id));
  };

  return (
    <>
      <LayoutTela
        titulo="Preparo de Pedidos"
        adicional={
          <span>
            {pedidos.filter((p) => !p.vendaConcluida).length > 0
              ? `${pedidos.filter((p) => !p.vendaConcluida).length} ${
                  pedidos.filter((p) => !p.vendaConcluida).length === 1
                    ? "pedido"
                    : "pedidos"
                }`
              : "Não há pedidos no momento"}
          </span>
        }
        adicionalUm={
          <div className="filtro-data">
            <DateRangePicker
              maxMonths={3}
              numberOfMonths={1}
              onChange={(range) => {
                console.log("Intervalo selecionado (Cozinha):", range);
              }}
            />
          </div>
        }
      >
        <article className="tela-comandas">
          {[...pedidos].reverse().map((pedido, index) => (
            <Comanda
              key={pedido.id}
              pedido={pedido}
              index={index}
              atualizarComandas={atualizarComandas}
            />
          ))}
        </article>
      </LayoutTela>
    </>
  );
}
