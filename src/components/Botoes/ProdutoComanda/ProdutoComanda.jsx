import './ProdutoComanda.css';
import { useState, useEffect } from 'react';
import { enviroments } from '../../../utils/enviroments';
import { imagemPadrao } from '../../../assets/imagemPadrao';
import { CiEdit } from "react-icons/ci";

export function ProdutoComanda({
    produto,
    preco,
    imagem,
    quantidade: quantidadeInicial,
    removerProduto,
    atualizarQuantidade,
    tipo,
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

    function diminuir() {
        if (quantidade > 1) {
            const novaQtd = quantidade - 1;
            setQuantidade(novaQtd);
            atualizarQuantidade(produto, novaQtd);
        } else {
            removerProduto(produto);
        }
    }

    function aumentar() {
        const novaQtd = quantidade + 1;
        setQuantidade(novaQtd);
        atualizarQuantidade(produto, novaQtd);
    }


    useEffect(() => {
        if (quantidadeInicial !== undefined && quantidade !== quantidadeInicial) {
            setQuantidade(quantidadeInicial);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantidadeInicial]);

    useEffect(() => {
        if (atualizarQuantidade && quantidade !== quantidadeInicial) {
            atualizarQuantidade(produto, quantidade);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantidade]);

    return (
        <div
            className="card-produto1"
            onClick={tipo === 'prato' ? () => onClick(produto, quantidade) : undefined}
        >
            <div className="card-produto">
                <div className="img-obs">
                    {urlImagem && (
                        <img
                            src={urlImagem}
                            title={`Imagem de ${produto}`}
                            className="imagem-produto"
                            alt={`Imagem de ${produto}`}
                        />
                    )}
                </div>

                <div className="detalhes-produto">
                    <span className="nome-produto" title={produto}>{produto}</span>
                    <span className="preco-produto">
                        R$ {(preco * quantidade).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                    </span>
                </div>

                <div className="controles-quantidade" onClick={e => e.stopPropagation()}>
                    <button className="btn-diminuir" onClick={diminuir}>-</button>
                    <span className="quantidade">{quantidade}</span>
                    <button className="btn-aumentar" onClick={aumentar}>+</button>
                </div>

                {tipo === 'prato' && (
                    <div className="observacao-produto">
                        Adicionar Observação
                         <CiEdit size={20}/>
                    </div>
                )}
            </div>
        </div>
    );
}
export default ProdutoComanda;
