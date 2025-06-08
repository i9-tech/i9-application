import "./Carregamento.css";
// import LOGO from "../../assets/logo-i9-branca.png";
import LOGO from "../../assets/logo-i9.png";

export default function CarregamentoFormulario({porcentagemCarregamento}) {
  return (
    <section className="tela-carregamento-formulario">
      <div className="tela-carregamento-modal">
        <img src={LOGO} alt="logo" />
        <span>ENVIANDO DADOS, POR FAVOR AGUARDE...</span>
        <div className="tela-carregamento-barra">
          <p
            className="tela-carregamento-porcentagem"
            style={{
              width: `${porcentagemCarregamento}%`,
            }}
          ></p>
        </div>
      </div>
    </section>
  );
}
