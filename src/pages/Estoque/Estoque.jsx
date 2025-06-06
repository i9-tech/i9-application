import "./Estoque.css";
import { useState, useEffect, useCallback } from "react";
import FiltrosEstoque from "../../components/EstoqueLista/FiltrosEstoque/FiltrosEstoque";
import { ResumoEstoque } from "../../components/EstoqueLista/ResumoEstoque/ResumoEstoque";
import TabelaEstoque from "../../components/EstoqueLista/TabelaEstoque/TabelaEstoque";
import { calcularResumoEstoque } from "./DadosProdutos/utilsEstoque";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import api from "../../provider/api";
import { enviroments } from "../../utils/enviroments";
import { ENDPOINTS } from "../../utils/endpoints";
import { getFuncionario } from "../../utils/auth";

export function Estoque() {
  const [filtroStatus, setFiltroStatus] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [resumo, setResumo] = useState([{}]);
  const token = localStorage.getItem("token");
  const funcionario = getFuncionario();
  const [termoBusca, setTermoBusca] = useState("");
  const [setorSelecionado, setSetorSelecionado] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true);

  const buscarProdutos = useCallback(() => {
    if (enviroments.ambiente === "jsonserver") {
      api
        .get(ENDPOINTS.PRODUTOS)
        .then((res) => {
          setProdutos(res.data);
          setResumo(calcularResumoEstoque(res.data));
          setIsLoadingData(false);
        })
        .catch((err) => {
          console.error("Erro ao ao buscar produtos:", err);
        });
    } else {
      api
        .get(`${ENDPOINTS.PRODUTOS}/${funcionario.userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProdutos(res.data);
          setResumo(calcularResumoEstoque(res.data));
          setIsLoadingData(false);
        })
        .catch((err) => {
          console.error("Erro ao ao buscar produtos:", err);
        });
    }
  }, [funcionario.userId, token]);

  useEffect(() => {
    buscarProdutos();
  }, [buscarProdutos]);

  return (
    <>
      <LayoutTela
        titulo="Estoque de Produtos"
        adicional={`${produtos.length} itens cadastrados`}
      >
        <div className="estoque">
          <FiltrosEstoque
            filtroStatus={filtroStatus}
            setFiltroStatus={setFiltroStatus}
            termoBusca={termoBusca}
            setTermoBusca={setTermoBusca}
            setorSelecionado={setorSelecionado}
            setSetorSelecionado={setSetorSelecionado}
          />
          <ResumoEstoque {...resumo} />
          <TabelaEstoque
            isLoadingData={isLoadingData}
            produtos={produtos}
            filtroStatus={filtroStatus}
            termoBusca={termoBusca}
            setorSelecionado={setorSelecionado}
            buscarProdutos={buscarProdutos}
          />
        </div>
      </LayoutTela>
    </>
  );
}

export default Estoque;
