import Dispositivos from "../../components/Dispositivos/Dispositivos";
import DescCardSobreposto from "../DescCardSobreposto/DescCardSobreposto";
import OpcoesCardSobreposto from "../OpcoesCardSobreposto/OpcoesCardSobreposto";

export default function CardSobreposto() {
  return (
    <>
      <article className="card-sobreposto">
        <Dispositivos />
        <DescCardSobreposto />
        <OpcoesCardSobreposto />
      </article>
      <div className="card" />
    </>
  );
}
