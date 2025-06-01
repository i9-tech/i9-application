import { useState, useEffect } from "react";
import CadastroProdutoFormulario from "../../components/Produtos/ProdutoForm/CadastroProdutoFormulario";
import ProdutoFoto from "../../components/Produtos/ProdutoFoto/ProdutoFoto";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import api from "../../provider/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Produtos.css";
import { useParams } from "react-router-dom";
import { ENDPOINTS } from "../../utils/endpoints";
import { getFuncionario, getToken } from "../../utils/auth";

export function Produtos() {
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const params = useParams();
  const token = getToken();
  const funcionario = getFuncionario();
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    if (params.id != null) {
      api
        .get(`${ENDPOINTS.PRODUTOS}/${params.id}/${funcionario.userId}`,{
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProdutoSelecionado(res.data);
          setDescricao(res.data?.descricao || "");
          setImagem(res.data?.imagem || "");
          console.log("Produto para edição: ", res.data);
        })
        .catch((err) => {
          console.error("Erro ao ao buscar produtos:", err);
        });
    }
  }, [params.id, funcionario.userId, token]);
  return (
    <>
      <LayoutTela titulo="Adição de Estoque">
        <div className="container-produto">
          <div className="coluna-esquerda">
            <CadastroProdutoFormulario
              produtoSelecionado={produtoSelecionado}
              setProdutoSelecionado={setProdutoSelecionado}
              descricao={descricao}
              setDescricao={setDescricao}
              imagem={imagem}
              setImagem={setImagem}
            />
          </div>

          <div className="coluna-direita">
            <ProdutoFoto
              imagem={
                imagem || (produtoSelecionado && produtoSelecionado.imagemUrl)
              }
              descricao={descricao}
              setDescricao={setDescricao}
              setImagem={setImagem}
            />
          </div>
        </div>
      </LayoutTela>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </>
  );
}

export default Produtos;
