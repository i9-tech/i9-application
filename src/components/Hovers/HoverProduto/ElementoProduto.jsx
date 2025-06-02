import "./ElementoProduto.css";
import { useEffect, useState } from "react";
import { enviroments } from "../../../utils/enviroments";
import { imagemPadrao } from "../../../assets/imagemPadrao";

export function ElementoProduto(props) {
  const { nome, preco, descricao, onAdicionar, disabled, imagem, quantidade } = props;

  const tokenImagem = enviroments.tokenURL;
  const [urlImagem, setUrlImagem] = useState('');

  useEffect(() => {
    if (imagem) {
      setUrlImagem(imagem + tokenImagem);
    } else {
      setUrlImagem(imagemPadrao);
    }
  }, [imagem, tokenImagem]);

  const adicionarProduto = () => {
    if (!disabled && onAdicionar) {
      onAdicionar({ nome, preco, imagem  });
    }
  };

  return (
    <div
      title={disabled ? 'Produto indisponível no momento' : 'Adicionar ao carrinho'}
      className={`elemento-produto ${disabled ? 'desabilitado' : ''}`}
      onClick={adicionarProduto}
    >
      <div className="conteudo-card">
        <h2>{nome}</h2>
        <p className="descricao">{descricao}</p>
        <span className="preco">
          <p>R$</p>
          {preco.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </span>

         <span className="quantidade">
          <p>{quantidade} Itens</p>
        </span>

      </div>

      <div className="conteudo-imagem">
        <img src={urlImagem} alt="Imagem Produto" />
      </div>

      <button className="botao-adicionar" disabled={disabled}>+</button>
    </div>
  );
}

export default ElementoProduto;
