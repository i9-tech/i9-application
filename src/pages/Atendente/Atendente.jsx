import './Atendente.css'
import BotaoConfirmar from '../../components/Botoes/BotaoConfirmar/BotaoConfirmar'
import ElementoTotal from '../../components/HoverTotalProduto/ElementoTotal'

export function Atendente() {
    return (
        <>
            <section className="menu-atendente">
                <h1>Escolha o Setor</h1>


                <div className="setores">
                    <ElementoTotal />
                    <ElementoTotal />
                    <ElementoTotal />
                    <ElementoTotal />
                </div>

            </section>

            <aside className="menu-comanda">
                <header className="header-comanda">
                    <h1>Comandas</h1>
                </header>

                <section className="botao-confirmar">
                    <BotaoConfirmar />
                </section>
            </aside>
        </>
    )
}