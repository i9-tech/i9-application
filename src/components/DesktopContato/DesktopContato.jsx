import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import api from '../../provider/api';

const DesktopContato = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [_mensagemInteresse, setMensagemInteresse] = useState('');
  const [mostrarCard, setMostrarCard] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState(null);
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mensal');

  const [cardHover, setCardHover] = useState(false);

  const precos = {
    mensal: {
      essencial: '99,00',
      profissional: '249,00',
      premium: '499,00',
    },
    anual: {
      essencial: '69,30',
      profissional: '174,30',
      premium: '349,30',
    },
  };

  const descricoes = {
    Essencial: 'Para quem quer fazer a gestão completa do negócio em uma única plataforma',
    Profissional: 'Para quem busca otimizar os processos da empresa com automações e dashboards',
    Premium: 'Para quem quer crescer o negócio com recursos para alta performance',
  };

  useEffect(() => {
    const handler = (e) => {
      const { mensagem, plano, periodo } = e.detail || {};
      if (mensagem || plano) {
        setMensagemInteresse(mensagem || '');
        setMostrarCard(true);
        setPlanoSelecionado(plano || null);
        setPeriodoSelecionado(periodo || 'mensal');
      }
    };
    window.addEventListener('abrirContato', handler);

    return () => window.removeEventListener('abrirContato', handler);
  }, []);

  const enviarEmail = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|br)(\.[a-z]{2})?$/i;
    if (!emailRegex.test(email)) {
      toast.error('Por favor, insira um e-mail válido que termine com .com ou .br.');
      return;
    }

    setIsLoading(true);
    const loadingToastId = toast.loading('Enviando e-mail, aguarde...');

    const payload = {
      email,
    };

    api
      .post('/envio-email/interesse', payload)
      .then(() => {
        toast.update(loadingToastId, {
          render: 'Email enviado com sucesso! Verifique sua caixa de entrada.',
          type: toast.SUCCESS,
          isLoading: false,
          autoClose: 8000,
        });
        setEmail('');
        setMostrarCard(false);
        setMensagemInteresse('');
        setPlanoSelecionado(null);
      })
      .catch((error) => {
        console.error('Erro ao enviar email:', error);
        toast.update(loadingToastId, {
          render: 'Erro ao enviar email. Verifique os dados e tente novamente.',
          type: 'error',
          isLoading: false,
          autoClose: 8000,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const obterPreco = (plano, periodo) => {
    if (!plano) return null;
    const key = plano.toLowerCase();
    return precos[periodo]?.[key] ?? null;
  };

  const planosContainerStyle = {
    textAlign: 'center',
    padding: 40,
    color: '#1e1e1e',
    width: '100%',
    boxSizing: 'border-box',
  };

  const cardPlanosBase = {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.495)',
    textAlign: 'center',
    transition: 'transform 0.2s ease, border 0.2s ease',
    margin: '0 auto',
    boxSizing: 'border-box',
  };

  const cardPlanosHover = cardHover
    ? {
      transform: 'translateY(-5px)',
      border: `1px solid var(--botoes-hover-destaques)`,
    }
    : {};

  const h2Style = {
    fontSize: '1.2rem',
    color: 'var(--texto-branco)',
    margin: 0,
    fontWeight: 700,
  };

  const pStyle = {
    margin: '8px 0',
    color: '#555',
    fontSize: '1rem',
  };

  const h3Style = {
    margin: '12px 0 0',
    color: 'var(--texto-preto)',
    fontSize: '1.5rem',
    fontWeight: 700,
  };

  const h3SpanStyle = {
    fontSize: '0.9rem',
    color: 'var(--texto-branco)',
  };

  const totalAnualStyle = {
    fontSize: '0.9rem',
    display: 'block',
    color: '#666',
  };

  return (
    <section className="contato" id="contato">
      <div className="contato-conteudo">
        <h1>Pronto para simplificar a <br /> gestão do seu negócio?</h1>
        <p>
          Gerencie estoque, pedidos e vendas de forma simples e eficiente.<br />
          Experimente o <span>i9</span> hoje mesmo!
        </p>

        <form
          className="email-formulario"
          onSubmit={enviarEmail}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            <input
              type="email"
              placeholder="nome@email.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isLoading}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                width: '339px',
                height: '35px',
                background: 'rgba(15, 20, 184, 0.16)',
                textAlign: 'center',
                fontSize: '1.125rem',
                boxSizing: 'border-box',
              }}
            />

            <button
              type="submit"
              disabled={isLoading}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3px 19px',
                width: '111px',
                height: '35px',
                border: 'none',
                borderRadius: '5px',
                background: 'var(--botoes-hover-destaques)',
                color: 'var(--cor-para-o-texto-branco)',
                fontWeight: '900',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              {isLoading ? 'Enviando...' : 'Enviar ›'}
            </button>
          </div>

          {mostrarCard && planoSelecionado && (
            <div
              className="planos-container-wrapper"
              style={{
                ...planosContainerStyle,
                paddingTop: 12,
              }}
            >
              <div
                className="card-planos"
                style={{
                  ...cardPlanosBase,
                  ...cardPlanosHover,
                }}
                onMouseEnter={() => setCardHover(true)}
                onMouseLeave={() => setCardHover(false)}
              >
                <h2 style={h2Style}>{planoSelecionado}</h2>
                <p style={pStyle}>{descricoes[planoSelecionado] || ''}</p>

                <h3 style={h3Style}>
                  R${obterPreco(planoSelecionado, periodoSelecionado)}<span style={h3SpanStyle}>/mês</span>
                </h3>

                {periodoSelecionado === 'anual' && (
                  <span style={totalAnualStyle}>
                    R${(parseFloat(precos.anual[planoSelecionado.toLowerCase()].replace(',', '.')) * 12)
                      .toFixed(2)
                      .replace('.', ',')}/ano
                  </span>
                )}

              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default DesktopContato;
