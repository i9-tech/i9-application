import './Hovers.css'
import BotaoOpcao from './HoverBotoes/BotaoOpcao'
import ElementoProduto from './HoverProduto/ElementoProduto'
import ElementoTotal from './HoverTotalProduto/ElementoTotal'
import ElementoImagem from './HoverImagem/ElementoImagem'

export function Hovers() {
    return (
        <>
            <section className='secao3 secao'>
                <div className='div-botoes-hover'>
                    <span>IMAGEM PRODUTO</span>
                    <ElementoImagem/>
                </div> 

                <div className='div-botoes-hover'>
                    <span>BOTÕES PADRÃO</span>
                    <BotaoOpcao texto={'Registro Simplificado de Pedidos'}/>
                    <BotaoOpcao texto={'Cardápio Personalizável'}/>
                    <BotaoOpcao texto={'Controle de Vendas'}/>
                </div>


                <div className='div-botoes-hover'>
                    <span>ELEMENTO PRODUTO</span>
                    <ElementoProduto />
                </div>

                <div className='div-botoes-hover'>
                    <span>ELEMENTO QTD PRODUTO</span>
                    <ElementoTotal/>
                </div> 
            </section>
        </>
    )
}