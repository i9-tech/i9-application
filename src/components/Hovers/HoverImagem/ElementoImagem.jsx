import './ElementoImagem.css'
import ImagemComida from '../assets/comida.png'

export function ElementoImagem({imagemSecao}) {
    return (
        <>
            <article>
                <div className='elemento-imagem'>
                    <img src={imagemSecao} alt="Imagem Comida" />
                    <div class="overlay">Registrar um pedido é rápido e fácil, evitando erros e melhorando a comunicação da equipe para um atendimento mais eficiente.</div>
                </div>
            </article>
        </>
    )
}

export default ElementoImagem

