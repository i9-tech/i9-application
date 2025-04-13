import "./ElementoProduto.css";
import ImagemProduto from '../../../assets/pastel.png';

export function ElementoProduto(props) {
  const { nome, preco, descricao, onAdicionar, disabled } = props;

  const adicionarProduto = () => {
    if (!disabled && onAdicionar) {
      onAdicionar({ nome, preco });
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
      </div>

      <div className="conteudo-imagem">
        <img src={ImagemProduto} alt="Imagem Produto" />
      </div>

      <button className="botao-adicionar" disabled={disabled}>+</button>
    </div>
  );
}

export default ElementoProduto;
