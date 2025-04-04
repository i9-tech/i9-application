import './Botoes.css'
import BotaoGenericoAtendente from './BotaoGenericoAtendente/BotaoGenericoAtendente'
import BotaoEntrar from './BotaoEntrar/BotaoEntrar'
import BotaoConfirmar from './BotaoConfirmar/BotaoConfirmar'
import CheckboxCozinha from './CheckboxCozinha/CheckboxCozinha'
import CheckboxPedidoCozinha from './CheckboxPedidoCozinha/CheckboxPedidoCozinha'
import BotaoCarrossel from './BotaoCarrossel/BotaoCarrossel'
import esquerda from '../../assets/seta-esquerda.svg';
import direita from '../../assets/seta-direita.svg';
import Navbar from './Navbar/Navbar'

export function Botoes () {
    return (
        <>
        <section className='secao1 secao'> 
            <div className='div-botoes-atendente'> 
                <span> BOTÕES GENERICOS TELA ATENDENTE</span>   
                <BotaoGenericoAtendente texto={'Confirmar Pedido'}/>
                <BotaoGenericoAtendente texto={'Adicionar Observação'}/>
                <BotaoGenericoAtendente texto={'Fechar'}/>
            </div>   

            <div className='div-botoes-atendente'> 
                <span> BOTÃO ENTRAR</span>   
                <BotaoEntrar texto={'Entrar >'}/>
            </div>

            <div className='div-botoes-atendente'> 
                <span> BOTÃO CONFIRMAR ATENDENTE</span>   
                <BotaoConfirmar/>
            </div>

            <div className='div-botoes-atendente'> 
                <span> CHECKBOX COZINHA</span>   
                <CheckboxCozinha texto={'Confirmar'}/>
                <CheckboxPedidoCozinha/>
            </div>
        
            <div className='div-botoes-atendente'> 
                <span> BOTÃO CARROSEL </span>   
                <BotaoCarrossel iconeDirecao={esquerda}/>
                <BotaoCarrossel iconeDirecao={direita}/>
            </div>

            <div className='div-botoes-atendente'> 
                <span> NAVBAR </span>   
                <Navbar/>
            </div>
        </section>
        </>
    )
}