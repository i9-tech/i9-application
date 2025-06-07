import React, { useState } from 'react';
import Swal from 'sweetalert2';
import api from "../../provider/api";

const DesktopContato = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const enviarEmail = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await api.post('/envio-email/interesse', email);
      Swal.fire({
        title: "Sucesso!",
        text: "Email enviado com sucesso! Verifique sua caixa de entrada.",
        icon: "success",
        iconColor: "#007bff",
        confirmButtonText: "Ok",
        customClass: {
          confirmButton: 'btn-aceitar',
        },
        buttonsStyling: false,
      });
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      Swal.fire({
        title: "Erro!",
        text: "Erro ao enviar email. Verifique os dados e tente novamente.",
        icon: "error",
        confirmButtonText: "Ok",
        customClass: {
          confirmButton: 'btn-cancelar',
        },
        buttonsStyling: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contato">
      <div className="contato-conteudo">
        <h1>Pronto para simplificar a <br /> gestão do seu negócio?</h1>
        <p>
          Gerencie estoque, pedidos e vendas de forma simples e eficiente.<br />
          Experimente o <span>i9</span> hoje mesmo!
        </p>

        <form className="email-formulario" onSubmit={enviarEmail}>
          <input
            type="email"
            placeholder="nome@email.com"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar ›'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default DesktopContato;