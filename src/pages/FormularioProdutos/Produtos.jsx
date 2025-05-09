import React, { useState, useEffect } from "react";
import CadastroProdutoFormulario from "../../components/Produtos/ProdutoForm/CadastroProdutoFormulario";
import ProdutoFoto from "../../components/Produtos/ProdutoFoto/ProdutoFoto";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import api from "../../provider/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "./Produtos.css";

export function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get("/produtos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        toast.error("Erro ao buscar produtos");
      }
    };

    fetchProdutos();
  }, []);

  return (
    <>
      <LayoutTela titulo="Adição de Estoque">
        <div className="container-produto">
          <div className="coluna-esquerda">
            <CadastroProdutoFormulario
              produtoSelecionado={produtoSelecionado}
              setProdutoSelecionado={setProdutoSelecionado}
            />
          </div>

          <div className="coluna-direita">
            <ProdutoFoto
              imagem={produtoSelecionado?.imagemUrl}
              descricao={produtoSelecionado?.descricao}
            />
          </div>
        </div>
      </LayoutTela>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </>
  );
}

export default Produtos;
