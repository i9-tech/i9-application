import './Listas.css';
import { Tabela } from './Tabela/Tabela';

import { useState } from 'react';

export function Listas () {
    const [tipoLista] = useState('Funcionario');

    // const mudarTipo = () => {
    //     setTipoLista(tipoLista === 'Estoque' ? 'Funcionario' : 'Estoque');
    // }
    
    return (
        <>
        <section className='secao4 secao'>
            {/* <BotaoMudar tipoLista={tipoLista} mudarTipo={mudarTipo}/> */}
            <Tabela tipoLista={tipoLista} />
        </section>
        </>
    )
}

export default Listas;