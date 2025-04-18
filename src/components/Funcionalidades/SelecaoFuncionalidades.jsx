import './Funcionalidades.css'

export function SelecaoFuncionalidades() {
    return (
        <>
        
        <div className="barraSelecao">
            <select className="menuFuncionalidades" defaultValue="pdv">
                <option value="pdv">Frente de caixa PDV</option>
                <option value="comandas">Gestão de Comandas</option>
                <option value="estoque">Gestão de Estoque</option>
            </select>
        </div>

        </>
    )
}

export default SelecaoFuncionalidades;
