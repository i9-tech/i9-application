import './ProdutoComanda.css';
import LancheNatural from '../../../assets/lanche.png';
import { useState, useEffect } from 'react';

export function ProdutoComanda({ produto, preco, atualizarQuantidade, onClick = () => {} }) {
    const [quantidade, setQuantidade] = useState(1);

    function diminuir() {
        if (quantidade > 1) {
            setQuantidade(quantidade - 1);
        }
    }
    function aumentar() {
        setQuantidade(quantidade + 1);
    }

    useEffect(() => {
        if (atualizarQuantidade) {
            atualizarQuantidade(produto, quantidade);
        }
    }, [quantidade]);

    return (
        <div className="card-produto" onClick={() => onClick(produto, quantidade)}>
            <img src={LancheNatural} alt="Lanche Natural" className="imagem-produto" />
            <div className="detalhes-produto">
                <span className="nome-produto">{produto}</span>
                <span className="preco-produto">R$ {(preco * quantidade).toFixed(2)}</span>
            </div>
            <div className="controles-quantidade" onClick={e => e.stopPropagation()}>
                <button className="btn-diminuir" onClick={diminuir}>-</button>
                <span className="quantidade">{quantidade}</span>
                <button className="btn-aumentar" onClick={aumentar}>+</button>
            </div>
        </div>
    );
}

export default ProdutoComanda;