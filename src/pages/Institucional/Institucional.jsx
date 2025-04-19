import CardSobreposto from "../../components/CardSobreposto/CardSobreposto";
import "./Institucional.css";
import "../../index.css";
import Perguntas from "../../components/Perguntas/Perguntas";
import NavInstitucional from "../../components/NavInstitucional/NavInstitucional";
import CardsSobreNos from "../../components/CardsSobreNos/CardsSobreNos";
import DesktopInicio from "../../components/DesktopInicio/DesktopInicio";
import DesktopContato from "../../components/DesktopContato/DesktopContato";
import DesktopFooter from "../../components/DesktopFooter/DesktopFooter";

export function Institucional() {
  return (
    <>
      <NavInstitucional />
      <section className="institucional-home" id="inicio">
        <DesktopInicio />
      </section>
      <section className="institucional" id="solucoes">
        <CardSobreposto />
      </section>
      <section className="institucional-sobre" id="sobre">
        <CardsSobreNos />
      </section>
      <section className="institucional-perguntas" id="sobre">
        <Perguntas />
      </section>
      <section className="institucional-end" id="contato">
        <DesktopContato />
        <DesktopFooter />
      </section>
    </>
  );
}
