import "./Cozinha.css";

import { useEffect, useState } from "react";
import Comanda from "../../components/ComandaFinal/Comanda/Comanda";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import { ENDPOINTS } from "../../utils/endpoints";
import api from "../../provider/api";
import { getFuncionario, getToken } from "../../utils/auth";

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
  }, []);

  const atualizarComandas = (id) => {
    setPedidos((item) => item.filter((pedidos) => pedidos.id !== id));
  };

  return (
    <>
      <LayoutTela
        titulo="Preparo de Pedidos"
        adicional={
          <p>
            {pedidos.length === 1
              ? pedidos.length + " pedido"
              : pedidos.length + " pedidos"}
          </p>
        }
      >
        <article className="tela-comandas">
          {[...pedidos].reverse().map((pedido, index) => (
            <Comanda
              key={index}
              pedido={pedido}
              index={index}
              numeroPedido={pedidos.length - 1 - index}
              atualizarComandas={atualizarComandas}
            />
          ))}
        </article>
      </LayoutTela>
    </>
  );
}
