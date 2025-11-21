import "./Cozinha.css";
import { useEffect, useState } from "react";
import Comanda from "../../components/ComandaFinal/Comanda/Comanda";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import { ENDPOINTS } from "../../utils/endpoints";
import api from "../../provider/api";
import { getFuncionario, getToken } from "../../utils/auth";
import { DateRangePicker } from "../../components/Calendario/DateRangePicker";
import Select from "react-select";
import { toast } from "react-toastify";

export function Cozinha() {
  const funcionario = getFuncionario();
  const token = getToken();

  const [pedidos, setPedidos] = useState([]);
  const [pedidosConcluidos, setPedidosConcluidos] = useState({});
  const [intervaloSelecionado, setIntervaloSelecionado] = useState({ from: null, to: null });
  const [modo, setModo] = useState("preparo");

  const [areas, setAreas] = useState([]);
  const [areaSelecionada, setAreaSelecionada] = useState("");

  const optionsAreas = [
    { value: "", label: "Todas Áreas" },
    ...areas.map((area) => ({ value: area.id, label: area.nome })),
  ];

  const formatarData = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!funcionario?.userId) return;

    api
      .get(`${ENDPOINTS.AREA_PREPARO}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => Array.isArray(res.data) && setAreas(res.data))
      .catch(() => toast.error("Erro ao buscar áreas!"));
  }, [funcionario?.userId, token]);

  const buscarComandas = () => {
    if (!funcionario?.empresaId) return;

    const params = {};
    if (intervaloSelecionado.from) params.dataInicio = formatarData(intervaloSelecionado.from);
    if (intervaloSelecionado.to) params.dataFim = formatarData(intervaloSelecionado.to);

    params.vendaConcluida = modo === "preparo" ? false : true;

    if (areaSelecionada) params.areaId = areaSelecionada;

    api
      .get(`${ENDPOINTS.VENDA_PRATOS_VENDIDOS_DIARIO}/${funcionario.empresaId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      })
      .then((res) => setPedidos(res.data))
      .catch((err) => console.log("Erro ao buscar comandas: ", err));
  };

  useEffect(() => {
    buscarComandas();
  }, [
    intervaloSelecionado.from?.getTime(),
    intervaloSelecionado.to?.getTime(),
    funcionario?.empresaId,
    token,
    modo,
    areaSelecionada,
  ]);

  useEffect(() => {
    const inicial = {};
    pedidos.forEach((pedido) => {
      pedido.itensCarrinho.forEach((item) => {
        inicial[item.id] = pedidosConcluidos[item.id] ?? pedido.vendaConcluida;
      });
    });
    setPedidosConcluidos(inicial);
  }, [pedidos]);

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
              ? `${pedidos.filter((p) => !p.vendaConcluida).length} ${pedidos.filter((p) => !p.vendaConcluida).length === 1
                ? "Pedido encontrado"
                : "Pedidos encontrados"
              }`
              : "Não há pedidos no momento"
            : `${pedidos.length} Comandas encontradas`}
        </span>
      }
      adicionalUm={
  <div className="filtro-data">
    <div className="filtro-area">
      <Select
        value={optionsAreas.find((opt) => opt.value === areaSelecionada)}
        onChange={(opt) => setAreaSelecionada(opt?.value ?? "")}
        options={optionsAreas}
        placeholder="Todas Áreas"
        isSearchable={false}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            minHeight: window.innerWidth <= 768 ? 35 : 45,
      fontSize: window.innerWidth <= 768 ? "13px" : "14px",
            minWidth: 100,
            maxWidth: 250,
            borderColor: state.isFocused
              ? "var(--cor-para-o-texto-branco)"
              : "transparent",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)",
            "&:hover": { borderColor: "transparent" },
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected
              ? "var(--titulos-botoes-destaques)"
              : state.isFocused
              ? "var(--cinza-hover-select)"
              : "var(--cor-para-o-texto-branco)",
            color: state.isSelected
              ? "var(--cor-para-o-texto-branco)"
              : "var(--cor-para-texto-preto)",
              fontSize: window.innerWidth <= 768 ? "13px" : "14px",
            padding: window.innerWidth <= 768 ? "6px 10px" : "8px 16px",
            cursor: "pointer",
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "var(--cor-para-texto-preto)",
             fontSize: window.innerWidth <= 768 ? "13px" : "14px",
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "var(--cor-para-texto-preto)",
             fontSize: window.innerWidth <= 768 ? "12px" : "14px",
          }),
          menuList: (base) => ({
            ...base,
            maxHeight: 200,
            overflowY: "auto",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: 5,
            marginTop: 0,
          }),
        }}
      />
    </div>
    <div className="filtro-botao">
      <button
        className={`botao-historico ${modo === "preparo" ? "ativo" : ""}`}
        onClick={modo === "preparo" ? abrirHistorico : voltarPreparo}
      >
        {modo === "preparo"
          ? "Histórico de Comandas"
          : "Voltar Para Preparo"}
      </button>
    </div>
    </div>
}      

adicionalDois={
    <div className="filtro-date">
      <DateRangePicker
        maxMonths={3}
        numberOfMonths={1}
        selected={intervaloSelecionado}
        onChange={(range) =>
          setIntervaloSelecionado(range ?? { from: null, to: null })
        }
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
              areaSelecionada={areaSelecionada}
              pedidosConcluidos={pedidosConcluidos}
              setPedidosConcluidos={setPedidosConcluidos}
            />
          ))}
      </article>
    </LayoutTela>
  );
}
