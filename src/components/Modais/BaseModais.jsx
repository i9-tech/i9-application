import './Modais.css'
import sucesso from '../../assets/icone-ok.svg'

export function BaseModais({ titulo, children }) {
    return (
        <>

        <div className="modal">
            <div className="modaisText">
                <h1 className="text">{titulo}</h1>
                <img src={sucesso} alt="icone de sucesso" />
                <p className="frase">{children}</p>
            </div>
        </div>

        </>
    )
}

export default BaseModais
