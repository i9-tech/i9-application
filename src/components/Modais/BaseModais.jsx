import './Modais.css'

export function BaseModais({ titulo, children }) {
    return (
        <>

        <div className="modal">
            <div className="modaisText">
                <h1 className="text">{titulo}</h1>
                <p className="frase">{children}</p>
            </div>
        </div>

        </>
    )
}

export default BaseModais