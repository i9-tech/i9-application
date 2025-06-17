import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import api from "../../provider/api";

const DesktopContato = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const enviarEmail = (event) => {
  event.preventDefault();
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|br)(\.[a-z]{2})?$/i;
  if (!emailRegex.test(email)) {
    toast.error("Por favor, insira um e-mail válido que termine com .com ou .br.");
    return;
  }

  setIsLoading(true);
  const loadingToastId = toast.loading("Enviando e-mail, aguarde...");

  api
    .post('/envio-email/interesse', email)
    .then(() => {
      toast.dismiss(loadingToastId);
      toast.success("Email enviado com sucesso! Verifique sua caixa de entrada.");
      setEmail('');
    })
    .catch((error) => {
      console.error('Erro ao enviar email:', error);
      toast.dismiss(loadingToastId);
      toast.error("Erro ao enviar email. Verifique os dados e tente novamente.");
    })
    .finally(() => {
      setIsLoading(false);
    });
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