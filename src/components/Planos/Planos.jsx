import React, { useState } from 'react';
import './Planos.css';
import IMAGEM_USER from '../../assets/usuario.svg';
import IMAGEM_SUPERUSER from '../../assets/icon-adminn.svg';
import IMAGEM_NAO from '../../assets/block.svg';
import IMAGEM_CHECK from '../../assets/check.svg';

const Planos = () => {
  const [periodo, setPeriodo] = useState('mensal');

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

  const handleComeceGratis = (planoNome) => {
    const mensagem = `Meu interesse é no plano ${planoNome} (${periodo}).\nValor: R$${precos[periodo][planoNome.toLowerCase()]} / mês${
      periodo === 'anual' ? ' (faturamento anual incluso)' : ''
    }`;

    window.dispatchEvent(
      new CustomEvent('abrirContato', {
        detail: { plano: planoNome, periodo, mensagem },
      })
    );

    const el = document.getElementById('contato');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="planos-container">
      <h1 className="titulo-planos">
        O <span className="destaque">plano ideal</span> para o seu negócio, tem
        na I9Tech!
      </h1>
      <p className="subtitulo">Comece a gerenciar seu negocio por um preço que cabe no seu bolso!</p>

      <div className="recursos">
        <p>
          <strong>Recursos ilimitados</strong> em todos os planos
        </p>
        <ul>
          <li>✔ Frente de caixa (PVD) </li>
          <li>✔ Gestão de comandas</li>
          <li>✔ Cadastros de funcionários</li>
          <li>✔ Atualização automática de pedidos e estoque</li>
          <li>✔ Indicadores de estoque baixo</li>
        </ul>
      </div>

      <div className="periodo">
        <button className={periodo === 'mensal' ? 'ativo' : ''} onClick={() => setPeriodo('mensal')}>
          Mensal
        </button>
        <button className={periodo === 'anual' ? 'ativo' : ''} onClick={() => setPeriodo('anual')}>
          Anual <span className={`economia ${periodo === 'anual' ? 'economia-ativa' : ''}`}>(economize até R$1.796,40)</span>
        </button>
      </div>

      <div className="cards">
        <div className="card-planos">
          <h2>Essencial</h2>
          <p>Para quem quer fazer a gestão completa do negócio em uma única plataforma</p>
          <h3>
            R${precos[periodo].essencial}
            <span>/mês</span>
          </h3>

          {periodo === 'anual' && (
            <span className="total-anual">
              R${(parseFloat(precos.anual.essencial.replace(',', '.')) * 12).toFixed(2).replace('.', ',')}/ano
            </span>
          )}

          <button className="btn-secondary" onClick={() => handleComeceGratis('Essencial')}>Comece grátis</button>

          <ul>
            <li className="feature">
              <img src={IMAGEM_USER} alt="Usuário" className="icone" />
              <span>10 Usuários</span>
            </li>
            <li className="feature">
              <img src={IMAGEM_SUPERUSER} alt="Super Usuário" className="icone" />
              <span>2 Super Usuários</span>
            </li>
            <li className="feature">
              <img src={IMAGEM_NAO} alt="Não Disponível" className="icone" />
              <span>Envio de relatório WhatsApp</span>
            </li>
            <li className="feature">
              <img src={IMAGEM_NAO} alt="Não Disponível" className="icone" />
              <span>Dashboard Analítica</span>
            </li>
          </ul>
        </div>

        <div className="card-planos destaque-card">
          <h2>Profissional</h2>
          <p>Para quem busca otimizar os processos da empresa com automações e dashboards</p>
          <h3>
            R${precos[periodo].profissional}
            <span>/mês</span>
          </h3>

          {periodo === 'anual' && (
            <span className="total-anual">
              R${(parseFloat(precos.anual.profissional.replace(',', '.')) * 12).toFixed(2).replace('.', ',')}/ano
            </span>
          )}

          <button className="btn-secondary" onClick={() => handleComeceGratis('Profissional')}>Comece grátis</button>

          <ul>
            <li className="feature">
              <img src={IMAGEM_USER} alt="Usuário" className="icone" />
              <span>35 Usuários</span>
            </li>
            <li className="feature">
              <img src={IMAGEM_SUPERUSER} alt="Super Usuário" className="icone" />
              <span>4 Super Usuários</span>
            </li>
            <li className="feature">
              <img src={IMAGEM_NAO} alt="Não Disponível" className="icone" />
              <span>Envio de relatório WhatsApp</span>
            </li>
            <li className="feature">
              <img src={IMAGEM_CHECK} alt="Disponível" className="icone" />
              <span>Dashboard Analítica</span>
            </li>
          </ul>
        </div>

        <div className="card-planos">
          <h2>Premium</h2>
          <p>Para quem quer crescer o negócio com recursos para alta performance</p>
          <h3>
            R${precos[periodo].premium}
            <span>/mês</span>
          </h3>

          {periodo === 'anual' && (
            <span className="total-anual">
              R${(parseFloat(precos.anual.premium.replace(',', '.')) * 12).toFixed(2).replace('.', ',')}/ano
            </span>
          )}

          <button className="btn-secondary" onClick={() => handleComeceGratis('Premium')}>Comece grátis</button>

          <ul>
            <li className="feature">
              <img src={IMAGEM_USER} alt="Usuário" className="icone" />
              <span>Ilimitados usuários</span>
            </li>
            <li className="feature">
              <img src={IMAGEM_SUPERUSER} alt="Super Usuário" className="icone" />
              <span>10 Super Usuários</span>
            </li>
            <li className="feature">
              <img src={IMAGEM_CHECK} alt="Disponível" className="icone" />
              <span>Envio de relatório WhatsApp</span>
            </li>
            <li className="feature">
              <img src={IMAGEM_CHECK} alt="Disponível" className="icone" />
              <span>Dashboard Analítica</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Planos;