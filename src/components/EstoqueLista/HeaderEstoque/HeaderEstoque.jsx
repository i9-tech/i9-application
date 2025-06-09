import "./HeaderEstoque.css";

export const HeaderEstoque = ({ totalItens }) => {
  return (
    <>
      <div className="header-estoque-prod">
        <h1 className="titulo-estoque-prod">Estoque de Produtos</h1>
        <span className="subtitulo-estoque-prod">
          {totalItens}
        </span>
      </div>
    </>
  );
};
