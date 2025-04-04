import "./ElementoProduto.css";

export function ElementoProduto(props) {
  return (
    <>
      <div className="botao-elemento-produto">
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
            <img src="" alt="imagem" />
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
