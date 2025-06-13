import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../utils/routers";
import IMAGEM_INSTITUCIONAL from '../../assets/imagem_institucional.png'

const DesktopInicio = ({ navegarParaSecao }) => {
  const navigate = useNavigate();


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
              <button className="btnUm" onClick={() => navigate(ROUTERS.LOGIN)}>Entrar ›</button>
              <div className="btnDois" onClick={() => navegarParaSecao("contato")}>Entre em contato conosco ›</div>
            </div>
          </div>
        </div>

        <div className="inicioImagem">
          <img
            src="src\assets\top-viewtop-view-manager-employee-doing-teamwork-business-office-looking-charts-laptop-display (1) 1.png"
            alt="Gestão Empresarial"
          />
          <img src={IMAGEM_INSTITUCIONAL} alt="Gestão Empresarial" />
        </div>
      </article>

      <div className="saibaMais">
        <div onClick={() => navegarParaSecao("solucoes")} className="saiba-mais">
          Saiba mais!
          <br />∨
        </div>
      </div>
    </>
  );
};

export default DesktopInicio;
