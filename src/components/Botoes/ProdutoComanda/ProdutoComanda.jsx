import './ProdutoComanda.css';
import LancheNatural from '../../../assets/lanche.png';
import { useState, useEffect } from 'react';

export function ProdutoComanda({ produto, preco, quantidade: quantidadeInicial, removerProduto, atualizarQuantidade, onClick = () => {} }) {
    const [quantidade, setQuantidade] = useState(quantidadeInicial || 1);

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
        if (quantidade !== quantidadeInicial) {
            atualizarQuantidade(produto, quantidade);
        }
    }, [quantidade, produto, atualizarQuantidade]);

    return (
        <div className="card-produto" onClick={() => onClick(produto, quantidade)}>
            <div className='img-obs'>
                <img src={LancheNatural} alt="Lanche Natural" className="imagem-produto" />
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