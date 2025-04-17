import React from 'react';
import './siteContato.css';

const DesktopContato = () => {
  return (
    <>

    <section className="contato">
      <div className="contato-conteudo">
        <h1>Pronto para simplificar a <br /> gestão do seu negócio?</h1>
        <p>
          Gerencie estoque, pedidos e vendas de forma simples e eficiente.<br />
          Experimente o <span>i9</span> hoje mesmo!
        </p>

        <form className="email-formulario">
          <input
            type="email"
            placeholder="nome@email.com"
            required
          />
          <button type="submit">Enviar ›</button>
        </form>
      </div>
    </section>

    </>
  );
};

export default DesktopContato;