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
  const [intervaloSelecionado, setIntervaloSelecionado] = useState({
    from: null,
    to: null,
  });
  const [modo, setModo] = useState("preparo");

  const formatarData = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };
  
  const formatarDataPT = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const buscarComandas = () => {
    if (!funcionario?.empresaId) return;

    const params = {};
    if (intervaloSelecionado.from)
      params.dataInicio = formatarData(intervaloSelecionado.from);
    if (intervaloSelecionado.to)
      params.dataFim = formatarData(intervaloSelecionado.to);

    api
      .get(`${ENDPOINTS.VENDA_PRATOS_VENDIDOS_DIARIO}/${funcionario.empresaId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      })
      .then((res) => setPedidos(res.data))
      .catch((err) => console.log("Erro ao buscar comandas: ", err));
  };

  // Requisita comandas sempre que mudar intervalo ou modo
  useEffect(() => {
    buscarComandas();
  }, [
    intervaloSelecionado.from?.getTime(),
    intervaloSelecionado.to?.getTime(),
    funcionario.empresaId,
    token,
    modo,
  ]);

  const atualizarComandas = (id) => {
    setPedidos((item) => item.filter((pedido) => pedido.id !== id));
  };

  const abrirHistorico = () => setModo("historico");
  const voltarPreparo = () => setModo("preparo");

  return (
    <LayoutTela
      titulo={modo === "preparo" ? "Preparo de Pedidos" : "Histórico de Comandas"}
      adicional={
        <span>
          {modo === "preparo"
            ? pedidos.filter((p) => !p.vendaConcluida).length > 0
              ? `${pedidos.filter((p) => !p.vendaConcluida).length} ${
                  pedidos.filter((p) => !p.vendaConcluida).length === 1
                    ? "Pedido encontrado"
                    : "Pedidos encontrados"
                }`
              : "Não há pedidos no momento"
            : `${pedidos.length} Comandas encontradas`}
        </span>
      }
      adicionalUm={
        <div className="filtro-data">
           <button
            className={`botao-historico ${modo === "preparo" ? "ativo" : ""}`}
            onClick={modo === "preparo" ? abrirHistorico : voltarPreparo}
          >
            {modo === "preparo" ? "Histórico de Comandas" : "Voltar para Preparo"}
          </button>

          <DateRangePicker
            maxMonths={3}
            numberOfMonths={1}
            selected={intervaloSelecionado}
            onChange={(range) => setIntervaloSelecionado(range)}
          />
        </div>
      }
    >
      <article className="tela-comandas">
        {[...pedidos]
          .reverse()
          .filter((pedido) => (modo === "preparo" ? !pedido.vendaConcluida : true))
          .map((pedido, index) => (
            <Comanda
              key={pedido.id}
              pedido={pedido}
              index={index}
              atualizarComandas={atualizarComandas}
              modo={modo}
            />
          ))}
      </article>
    </LayoutTela>
  );
}
