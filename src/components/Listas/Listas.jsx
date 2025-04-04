import './Listas.css';
import { Tabela } from './Tabela/Tabela';
import { BotaoMudar } from './BotaoMudar/BotaoMudar';
import { useState } from 'react';

export function Listas () {
    const [tipoLista, setTipoLista] = useState('Estoque');

    const mudarTipo = () => {
        setTipoLista(tipoLista === 'Estoque' ? 'Funcionario' : 'Estoque');
    }
    
    return (
        <>
        <section className='secao4 secao'>
            <BotaoMudar tipoLista={tipoLista} mudarTipo={mudarTipo}/>
            <Tabela tipoLista={tipoLista} />
        </section>
        </>
    )
}