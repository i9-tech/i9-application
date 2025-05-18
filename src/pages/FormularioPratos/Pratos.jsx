import React, { useState, useEffect } from "react";
import CadastroPratoFormulario from "../../components/Pratos/PratoForm/CadastroPratoFormulario";
import PratoFoto from "../../components/Pratos/PratoFoto/PratoFoto";
import LayoutTela from "../../components/LayoutTela/LayoutTela";
import api from "../../provider/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Pratos.css";
import { useParams } from "react-router-dom";

export function Pratos() {
  const [pratos, setPratos] = useState([]);
  const [pratoSelecionado, setPratoSelecionado] = useState(null);
  const params = useParams();
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    if (params != null) {
      api
        .get(`/pratos/${params.id}`)
        .then((res) => {
          setPratoSelecionado(res.data);
          setDescricao(res.data?.descricao || "");
          setImagem(res.data?.imagem || "");
        })
        .catch((err) => {
          console.error("Erro ao ao buscar produtos:", err);
        });
    }
  }, [params]);

  return (
    <>
      <LayoutTela titulo="Adição de Pratos">
        <div className="container-prato">
          <div className="coluna-esquerda">
            <CadastroPratoFormulario
              pratoSelecionado={pratoSelecionado}
              setPratoSelecionado={setPratoSelecionado}
              descricao={descricao}
              setDescricao={setDescricao}
              imagem={imagem}
              setImagem={setImagem}
            />
          </div>

          <div className="coluna-direita">
            <PratoFoto
              imagem={
                imagem || (pratoSelecionado && pratoSelecionado.imagemUrl)
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

export default Pratos;
