import React, { useState } from "react";
import { buscarImagensUnsplash } from "../../utils/utils";
import "./ModalBuscaImagem.css";

const ModalBuscaImagem = ({ abrir, onFechar, onSelecionar }) => {
  const [query, setQuery] = useState("");
  const [imagens, setImagens] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const buscarImagens = async () => {
    if (!query) return;
    setCarregando(true);
    try {
      const resultado = await buscarImagensUnsplash(query);
      setImagens(resultado);
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
      setImagens([]);
    } finally {
      setCarregando(false);
    }
  };

  if (!abrir) return null;

  return (
    <div className="modal-fundo">
      <div className="modal-conteudo">
        <button className="btn-fechar" onClick={onFechar}>X</button>
        <h2>Buscar Imagens</h2>

        <div className="campo-busca">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o nome da imagem"
          />
          <button onClick={buscarImagens}>Buscar</button>
        </div>

        {carregando && <p>Carregando...</p>}

        <div className="galeria-imagens">
          {imagens.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={img.nome}
              onClick={() => {
                onSelecionar(img.url);
                onFechar();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalBuscaImagem;
