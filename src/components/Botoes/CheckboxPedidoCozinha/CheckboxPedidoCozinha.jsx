import "./CheckboxPedidoCozinha.css";
import iconeCheck from "../../../assets/check.svg";

export function CheckboxPedidoCozinha({ id, checkboxParaMarcar, checkarItem }) {
  return (
    <div className="btn-check">
      <input
        type="checkbox"
        id={id}
        checked={checkboxParaMarcar ?? false} 
        onChange={checkarItem}
      />
      <label htmlFor={id} className="checkbox-cozinha-label2">
        <img src={iconeCheck} alt="Ícone de completo" />
      </label>
    </div>
  );
}

export default CheckboxPedidoCozinha;
