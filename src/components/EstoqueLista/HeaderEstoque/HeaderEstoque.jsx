import "./HeaderEstoque.css";

export const HeaderEstoque = ({ totalItens }) => {
  return (
    <>
      <div className="header-estoque">
        <h1 className="titulo-estoque">Estoque de Produtos</h1>
        <span className="subtitulo-estoque">
          {totalItens}
        </span>
      </div>
    </>
  );
};
