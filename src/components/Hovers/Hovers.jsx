import './Hovers.css'
import BotaoOpcaoHover from './HoverBTN/BotaoOpcaoHover'
import ElementoProduto from './HoverProduto/ElementoProduto'

export function Hovers() {
    return (
        <>
            <section className='secao3 secao'>
                <div className='div-botoes-hover'>
                    <span>IMAGEM PRODUTO</span>
                </div> 

                <div className='div-botoes-hover'>
                    <span>BOTÕES PADRÃO</span>
                    <BotaoOpcaoHover texto={'Registro Simplificado de Pedidos'}/>
                    <BotaoOpcaoHover texto={'Cardápio Personalizável'}/>
                    <BotaoOpcaoHover texto={'Controle de Vendas'}/>
                </div>


                <div className='div-botoes-hover'>
                    <span>ELEMENTO PRODUTO</span>
                    <ElementoProduto />
                </div>

                <div className='div-botoes-hover'>
                    <span>ELEMENTO QTD PRODUTO</span>
                </div> 
            </section>
        </>
    )
}