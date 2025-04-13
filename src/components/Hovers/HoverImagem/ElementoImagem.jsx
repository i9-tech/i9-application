import "./ElementoImagem.css";
import ImagemComida from "../assets/comida.png";

export function ElementoImagem({ imagemSecao, respostaPergunta }) {
  return (
    <>
      <article className="artigo-imagem">
        <div className="elemento-imagem">
          <img src={imagemSecao} alt="Imagem Comida" />
          {respostaPergunta && (
            <div className={`overlay ${respostaPergunta ? 'visivel' : ''}`}>{respostaPergunta}</div>
          )}
        </div>
      </article>
    </>
  );
}

export default ElementoImagem;
