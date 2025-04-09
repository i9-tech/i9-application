import "./ElementoProduto.css";
import ImagemProduto from '../assets/image.png';

export function ElementoProduto(props) {
  return (
    <>
      <div className="elemento-produto">
        <article>
          <div className="conteudo-card">
            <h2>Produto</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              nihil, veniam
            </p>
            <span>
              <p>R$</p> 00,00
            </span>
          </div>
          <div className="conteudo-imagem">
            <img src={ImagemProduto} alt="Imagem Produto" />
          </div>
          <div className="conteudo-botao">
            <button>+</button>
          </div>
        </article>
      </div>
    </>
  );
}

export default ElementoProduto;
