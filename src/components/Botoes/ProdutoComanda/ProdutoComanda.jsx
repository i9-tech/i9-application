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
    const [urlImagem, setUrlImagem] = useState(null);

    useEffect(() => {
        if (imagem && imagem.trim() !== '') {
            setUrlImagem(imagem + tokenImagem);
        } else {
            setUrlImagem(imagemPadrao);
        }
    }, [imagem, tokenImagem]);

    useEffect(() => {
        if (quantidade !== quantidadeInicial) {
            setQuantidade(quantidadeInicial);
        }
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
        if (atualizarQuantidade && quantidade !== quantidadeInicial) {
            atualizarQuantidade(produto, quantidade);
        }
    }, [quantidade, produto]);


    return (
        <div className="card-produto" onClick={() => onClick(produto, quantidade)}>
            <div className='img-obs'>
                {urlImagem && (
                    <img
                        src={urlImagem}
                        title={`Imagem de ${produto}`}
                        className="imagem-produto"
                        alt={`Imagem de ${produto}`}
                    />
                )}
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
                <br />
            </div>
        </div>
    );
}

export default ProdutoComanda;
