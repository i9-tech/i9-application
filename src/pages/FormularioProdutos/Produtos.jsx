import React, { useState, useEffect } from "react";
import CadastroProdutoFormulario from "../../components/Produtos/ProdutoForm/CadastroProdutoFormulario";
import ProdutoFoto from "../../components/Produtos/ProdutoFoto/ProdutoFoto";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import api from "../../provider/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "./Produtos.css";
import { useParams } from "react-router-dom";
import { ENDPOINTS } from "../../utils/endpoints";

export function Produtos() {
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const params = useParams();
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    if (params != null) {
      api
        .get(`${ENDPOINTS.PRODUTOS}/${params.id}`)
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
  }, []);

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
