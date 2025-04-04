import './botaoMudar.css'
export function BotaoMudar({ tipoLista, mudarTipo }) {

    return(
        <>
        <button className='botaoMudar' onClick={mudarTipo}>
        {tipoLista === 'Estoque' ? 'Mostrar Lista Funcionários' : 'Mostrar Lista Estoque'}
        </button>
        </>
    )
}