import "./ElementoProduto.css";
import { useEffect, useState } from "react";
import { enviroments } from "../../../utils/enviroments";
import { imagemPadrao } from "../../../assets/imagemPadrao";

export function ElementoProduto(props) {
  const { id, nome, preco, descricao, onAdicionar, disabled, imagem, quantidade, tipo } = props;

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
      onAdicionar({ id, nome, preco, imagem, tipo });
    }
  };

  return (
    <div
      title={disabled ? 'Produto indisponível no momento' : 'Adicionar ao carrinho'}
      className={`elemento-produto ${disabled ? 'desabilitado' : ''}`}
      onClick={adicionarProduto}
    >
      <div className="conteudo-card">
        <h2 title={nome}>{nome}</h2>
        <p className="descricao" title={descricao}>{descricao}</p>
        <div className="preco-quantidade">
          <span className="preco">
            <span className="rs">R$</span>
            {preco.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </span>

          {quantidade != null && quantidade !== undefined && (
            <span className="quantidade-itens-atendentimento">
              {quantidade} Itens
            </span>
          )}
        </div>

      </div>

      <div className="conteudo-imagem">
        {urlImagem ? (
          <img src={urlImagem} title={`Imagem de ${nome}`} alt={`Imagem de ${nome}`} />
        ) : null}
      </div>

      <button className="botao-adicionar" disabled={disabled}>+</button>
    </div>
  );
}

export default ElementoProduto;
