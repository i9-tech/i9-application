import './SobreNos.css'

export function ImagemSobreNos({imagem, alt}) {
    return (
        <>
            <div className="img">
                <img src="{imagem}" alt="{alt}" />
            </div>
        </>
    )
}

export default ImagemSobreNos;