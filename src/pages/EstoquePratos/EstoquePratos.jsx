import "./EstoquePratos.css";
import { useEffect, useState, useCallback } from "react";
import FiltrosPratos from "../../components/EstoquePratos/FiltrosPratos/FiltrosPratos";
import { ResumoPratos } from "../../components/EstoquePratos/ResumoPratos/ResumoPratos";
import TabelaPratos from "../../components/EstoquePratos/TabelaPratos/TabelaPratos";
import { calcularResumoPratos } from "./DadosPratos/utilsPratos";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import api from "../../provider/api";
import { ENDPOINTS } from "../../utils/endpoints";
import { getFuncionario, getToken } from "../../utils/auth";

export function EstoquePratos() {
  const token = getToken();
  const funcionario = getFuncionario();
  const [termoBusca, setTermoBusca] = useState("");
  const [setorSelecionado, setSetorSelecionado] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [filtros, setFiltros] = useState({
    status: null,
    categoria: "",
    setor: "",
  });

  const [pratos, setPratos] = useState([]);
  const [resumo, setResumo] = useState([{}]);

  const buscarPratos = useCallback(() => {
    api
      .get(`${ENDPOINTS.PRATOS}/${funcionario.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPratos(res.data);
        setResumo(calcularResumoPratos(res.data));
        if (res.data.length === 0) {
          setTimeout(() => {
            setIsLoadingData(false);
          }, 2500);
        } else {
          setIsLoadingData(false);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar pratos:", err);
        setIsLoadingData(false);
      });
  }, [funcionario.userId, token]);

  useEffect(() => {
    buscarPratos();
  }, [buscarPratos]);

  return (
    <LayoutTela
      titulo="Estoque de Pratos"
      adicional={`${pratos.length} itens cadastrados`}
    >
      <div className="estoque">
        <FiltrosPratos
          filtros={filtros}
          setFiltros={setFiltros}
          termoBusca={termoBusca}
          setTermoBusca={setTermoBusca}
          setorSelecionado={setorSelecionado}
          setSetorSelecionado={setSetorSelecionado}
          categoriaSelecionada={categoriaSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
        />
        <ResumoPratos {...resumo} />
        <TabelaPratos
          isLoadingData={isLoadingData}
          pratos={pratos}
          filtros={filtros}
          buscarPratos={buscarPratos}
          termoBusca={termoBusca}
          setTermoBusca={setTermoBusca}
          setorSelecionado={setorSelecionado}
          setSetorSelecionado={setSetorSelecionado}
          categoriaSelecionada={categoriaSelecionada}
          setCategoriaSelecionada={setCategoriaSelecionada}
        />
      </div>
    </LayoutTela>
  );
}

export default EstoquePratos;
