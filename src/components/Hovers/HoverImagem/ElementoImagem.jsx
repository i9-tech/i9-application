import './ElementoImagem.css'
import ImagemComida from '../assets/comida.png'

export function ElementoImagem() {
    return (
        <>
            <article>
                <div className='elemento-imagem'>
                    <img src={ImagemComida} alt="Imagem Comida" />
                    <div class="overlay"></div>
                </div>
            </article>
        </>
    )
}

export default ElementoImagem

