import './ProdutoComanda.css';
import { useState, useEffect } from 'react';
import { enviroments } from '../../../utils/enviroments';
import { imagemPadrao } from '../../../assets/imagemPadrao';

export function ProdutoComanda({
    produto,
    preco,
    imagem,
    quantidade: quantidadeInicial,
    removerProduto,
    atualizarQuantidade,
    onClick = () => { },
}) {
    const [quantidade, setQuantidade] = useState(quantidadeInicial || 1);

    const tokenImagem = enviroments.tokenURL;
    const [urlImagem, setUrlImagem] = useState('');

    useEffect(() => {
        if (imagem) {
            setUrlImagem(imagem + tokenImagem);
        } else {
            setUrlImagem(imagemPadrao);
        }
    }, [imagem, tokenImagem]);



    useEffect(() => {
        setQuantidade(quantidadeInicial);
    }, [quantidadeInicial]);

    function diminuir() {
        if (quantidade > 1) {
            setQuantidade(qtd => qtd - 1);
        } else {
            removerProduto(produto);
        }
    }

    function aumentar() {
        setQuantidade(qtd => qtd + 1);
    }

    useEffect(() => {
        if (atualizarQuantidade) {
            atualizarQuantidade(produto, quantidade);
        }
    }, [quantidade, produto, atualizarQuantidade]);

    return (
        <div className="card-produto" onClick={() => onClick(produto, quantidade)}>
            <div className='img-obs'>
                <img src={urlImagem} title={`Imagem de ${produto}`} className="imagem-produto" />
                <span className="observacao-produto">Observação</span>
            </div>
            <div className="detalhes-produto">
                <span className="nome-produto" title={produto}>{produto}</span>
                <span className="preco-produto">R$ {(preco * quantidade).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}</span>
            </div>
            <div className="controles-quantidade" onClick={e => e.stopPropagation()}>
                <button className="btn-diminuir" onClick={diminuir}>-</button>
                <span className="quantidade">{quantidade}</span>
                <button className="btn-aumentar" onClick={aumentar}>+</button>
                <br></br>

            </div>

        </div>
    );
}

export default ProdutoComanda;