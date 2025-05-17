import IMAGEM_INSTITUCIONAL from '../../assets/imagem_institucional.png'

const DesktopInicio = () => {
  return (
    <>
      <article className="inicio">
        <div className="inicioConteudo">
          <div className="titulo-container">
            <h1 className="titulo1">
              Facilitamos a gestão <br />
              para que você foque no que realmente importa:
            </h1>

            <span className="titulo2">seu negócio</span>

            <p className="frase">
              Soluções integradas para otimizar seu restaurante e mercado, com
              controle de estoque e gestão de pedidos
            </p>

            <div className="inicioBotoes">
              <button className="btnUm">Entrar ›</button>
              <a className="btnDois" href="#">Entre em contato conosco ›</a>
            </div>
          </div>
        </div>

        <div className="inicioImagem">
          <img src={IMAGEM_INSTITUCIONAL} alt="Gestão Empresarial" />
        </div>
      </article>

      <div className="saibaMais">
        <a href="#" className="saiba-mais">
          Saiba mais!
          <br />
          ∨
        </a>
      </div>
    </>
  );
};

export default DesktopInicio;
