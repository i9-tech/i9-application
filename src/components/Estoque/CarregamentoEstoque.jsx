import "./Estoques.css";

export default function CarregamentoEstoque({ colunas }) {
  return (
    <tr className="carregamento-estoque">
      {[...Array(colunas)].map((_, index) => {
        const isImagem = index === 1;
        const isUltimo = index === colunas - 1;

        return (
          <td key={index} className="dado-carregamento-estoque">
            <div className="centralizador-carregamento">
              {isImagem ? (
                <div className="centralizar-imagem-carregamento" />
              ) : isUltimo ? (
                <>
                  <div className="centralizar-botoes-carregamento" />
                  <div className="centralizar-botoes-carregamento" />
                </>
              ) : (
                <div className="bloco-carregamento" />
              )}
            </div>
          </td>
        );
      })}
    </tr>
  );
}
