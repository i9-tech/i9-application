import React, { useState, useEffect } from "react";
import CadastroPratoFormulario from "../../components/Pratos/PratoForm/CadastroPratoFormulario";
import PratoFoto from "../../components/Pratos/PratoFoto/PratoFoto";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import api from "../../provider/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Pratos.css";

export function Pratos() {
  const [pratos, setPratos] = useState([]);
  const [pratoSelecionado, setPratoSelecionado] = useState(null);

  useEffect(() => {
    const fetchPratos = async () => {
      try {
        const response = await api.get("/pratos", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPratos(response.data);
      } catch (error) {
        console.error("Erro ao buscar pratos:", error);
        toast.error("Erro ao buscar pratos");
      }
    };

    fetchPratos();
  }, []);

  return (
    <>
      <LayoutTela titulo="Adição de Pratos">
        <div className="container-prato">
          <div className="coluna-esquerda">
            <CadastroPratoFormulario
              pratoSelecionado={pratoSelecionado}
              setPratoSelecionado={setPratoSelecionado}
            />
          </div>

          <div className="coluna-direita">
            <PratoFoto
              imagem={pratoSelecionado?.imagemUrl}
              descricao={pratoSelecionado?.descricao}
            />
          </div>
        </div>
      </LayoutTela>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </>
  );
}

export default Pratos;
