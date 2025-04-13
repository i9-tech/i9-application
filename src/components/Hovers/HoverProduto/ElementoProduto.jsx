import "./ElementoProduto.css";
import ImagemProduto from '../../../assets/pastel.png';

export function ElementoProduto(props) {
  return (
    <>
      <div className="elemento-produto">
        <div className="conteudo-card">
          <h2>{props.nome}</h2>
          <p className="descricao">{props.descricao}</p>
          <span className="preco"><p>R$</p>{props.preco}</span>
        </div>

        <div className="conteudo-imagem">
          <img src={ImagemProduto} alt="Imagem Produto" />
        </div>

        <button className="botao-adicionar">+</button>
      </div>
    </>
  );
}

export default ElementoProduto;
