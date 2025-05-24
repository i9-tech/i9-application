import { useEffect, useState } from "react";
import { imagemPadrao } from "../../../assets/imagemPadrao";
import { enviroments } from "../../../utils/enviroments";
import "./FuncionarioFoto.css";

const FuncionarioFoto = ({ imagem, setImagem }) => {
  const tokenImagem = enviroments.tokenURL;
  const [previewImagem, setPreviewImagem] = useState("");

  useEffect(() => {
    if (typeof imagem === "string" && imagem.trim() !== "") {
      if (enviroments.ambiente === "jsonserver") {
        setPreviewImagem(imagem);
      } else {
        setPreviewImagem(imagem + tokenImagem);
      }
    } else {
      setPreviewImagem("");
    }
  }, [imagem, tokenImagem]);

  useEffect(() => {
    return () => {
      if (previewImagem && previewImagem.startsWith("blob:")) {
        URL.revokeObjectURL(previewImagem);
      }
    };
  }, [previewImagem]);

  const alterarImagem = (e) => {
    const arquivoImagem = e.target.files[0];

    if (arquivoImagem) {
      const urlImagemTemporaria = URL.createObjectURL(arquivoImagem);
      setPreviewImagem(urlImagemTemporaria);
      setImagem(arquivoImagem);
    }
  };

  return (
    <div className="foto-funcionario">
      <img
        src={previewImagem || imagemPadrao}
        alt="Foto do funcionário"
        className={`imagem-preview-funcionario ${
          !previewImagem ? "imagem-padrao" : ""
        }`}
      />
      <p className="texto-upload">
        <label htmlFor="upload-input">
          Faça upload da foto (JPG, PNG, JPEG)
        </label>
        <input
          id="upload-input"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={alterarImagem}
          className="input-escondido"
        />
      </p>
    </div>
  );
};

export default FuncionarioFoto;
