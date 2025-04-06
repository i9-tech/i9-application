import './Atendente.css'
import BotaoConfirmar from '../../components/Botoes/BotaoConfirmar/BotaoConfirmar'
import ElementoTotal from '../../components/Hovers/HoverTotalProduto/ElementoTotal'
import LupaPesquisa from '../../assets/lupa-pesquisa.svg'
import ElementoProduto from '../../components/Hovers/HoverProduto/ElementoProduto'

export function Atendente(props) {
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

                <div className="header-container">
                    <h1>{props.categoria}</h1>
                    <div className="barra-pesquisa">
                        <input type="text" placeholder="Procurar Produto" className="input-pesquisa-produtos" />
                        <button className="lupa-pesquisa">
                            <img src={LupaPesquisa} alt="Pesquisar" />
                        </button>
                    </div>
                </div>

                <div className='todos-produtos'>
                <ElementoProduto/>
                <ElementoProduto/>
                <ElementoProduto/>
                <ElementoProduto/>
                <ElementoProduto/>
                <ElementoProduto/>
                <ElementoProduto/>
                <ElementoProduto/>
                <ElementoProduto/>
                <ElementoProduto/>
                <ElementoProduto/>
                <ElementoProduto/>
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