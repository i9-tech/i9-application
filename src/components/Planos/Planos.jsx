import React, { useEffect, useState } from 'react';
import './Planos.css';
import IMAGEM_USER from '../../assets/usuario.svg';
import IMAGEM_SUPERUSER from '../../assets/icon-adminn.svg';
import IMAGEM_NAO from '../../assets/block.svg';
import IMAGEM_CHECK from '../../assets/check.svg';

import api from "../../provider/api";
import { ROUTERS } from "../../utils/routers";
import { toast } from "react-toastify";

const Planos = () => {
  const [periodo, setPeriodo] = useState('mensal');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    api.get(`${ROUTERS.PLANOS_TEMPLATES}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? res.data);
        setTemplates(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('Erro ao buscar templates de plano:', err);
        toast.error('Não foi possível carregar os planos.');
      })
      .finally(() => setLoading(false));
  }, [token]);

  const formatMoney = (value) => {
    if (value === null || value === undefined) return '-';
    const num = typeof value === 'number' ? value : parseFloat(String(value).replace(',', '.'));
    if (Number.isNaN(num)) return '-';
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleComeceGratis = (tpl) => {
    const preco = periodo === 'mensal'
      ? tpl?.precoMensal
      : (tpl?.precoMensalComDescontoAnual ?? (tpl?.precoAnual != null ? (typeof tpl.precoAnual === 'number' ? tpl.precoAnual/12 : parseFloat(String(tpl.precoAnual).replace(',', '.'))/12) : null));

    const precoFormat = preco == null ? '-' : formatMoney(preco);

    const mensagem = `Meu interesse é no plano ${tpl?.tipo ?? 'Plano'} (${periodo}).\nValor: R$${precoFormat} / mês${periodo === 'anual' ? ' (valor anual incluso)' : ''}` +
      (tpl?.descricao ? `\nDescrição: ${tpl.descricao}` : '');

    window.dispatchEvent(new CustomEvent('abrirContato', {
      detail: { plano: tpl?.tipo ?? 'Plano', periodo, mensagem, planoTemplateId: tpl?.id ?? null }
    }));

    const el = document.getElementById('contato');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const economiaMaior = () => {
    if (!templates.length) return 0;
    const maisCaro = templates.reduce((max, tpl) => {
      return tpl.precoMensal > (max.precoMensal ?? 0) ? tpl : max;
    }, {});
    if (!maisCaro.precoMensal || !maisCaro.precoAnual) return 0;
    const mensalTotal = maisCaro.precoMensal * 12;
    const economia = mensalTotal - maisCaro.precoAnual;
    return economia > 0 ? economia : 0;
  };

  if (loading) {
    return (
      <div className="planos-container">
        <h1 className="titulo-planos">
          O <span className="destaque">plano ideal</span> para o seu negócio, tem na I9Tech!
        </h1>
        <p className="subtitulo loading">Carregando planos...</p>
      </div>
    );
  }

  return (
    <div className="planos-container">
      <h1 className="titulo-planos">
        O <span className="destaque">plano ideal</span> para o seu negócio, tem na I9Tech!
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
        <button className={periodo === 'mensal' ? 'ativo' : ''} onClick={() => setPeriodo('mensal')}>Mensal</button>
        <button className={periodo === 'anual' ? 'ativo' : ''} onClick={() => setPeriodo('anual')}>
          Anual <span className={`economia ${periodo === 'anual' ? 'economia-ativa' : ''}`}>(Economize até R$${formatMoney(economiaMaior())})</span>
        </button>
      </div>

      <div className="cards">
        {templates.map((tpl) => {
          const usuariosNum = parseInt(String(tpl.qtdUsuarios ?? '').replace(/\D/g, ''), 10);
          const usuariosLabel = (!isNaN(usuariosNum) && usuariosNum > 1000) ? 'Ilimitados' : (tpl.qtdUsuarios ?? '-');

          return (
            <div
              key={tpl.id}
              className={`card-planos ${tpl.tipo?.toLowerCase() === 'profissional' ? 'destaque-card' : ''}`}
            >
              <h2>{tpl.tipo}</h2>
              <p>{tpl.descricao ?? '-'}</p>
              <h3>
                R${formatMoney(periodo === 'mensal' ? tpl.precoMensal : (tpl.precoMensalComDescontoAnual ?? tpl.precoAnual/12))}
                <span>/mês</span>
              </h3>
              {periodo === 'anual' && (
                <span className="total-anual">
                  R${tpl.precoAnual ? formatMoney(tpl.precoAnual) : '-'} / ano
                </span>
              )}
              <button className="btn-secondary" onClick={() => handleComeceGratis(tpl)}>Comece grátis</button>

              <ul>
                <li className="feature">
                  <img src={IMAGEM_USER} alt="Usuário" className="icone" />
                  <span>{usuariosLabel} Usuários</span>
                </li>
                <li className="feature">
                  <img src={IMAGEM_SUPERUSER} alt="Super Usuário" className="icone" />
                  <span>{tpl.qtdSuperUsuarios ?? '-'} Super Usuários</span>
                </li>
                <li className="feature">
                  <img src={tpl.acessoRelatorioWhatsApp ? IMAGEM_CHECK : IMAGEM_NAO} alt={tpl.acessoRelatorioWhatsApp ? "Disponível" : "Não Disponível"} className="icone" />
                  <span>Envio de relatório WhatsApp</span>
                </li>
                <li className="feature">
                  <img src={tpl.acessoDashboard ? IMAGEM_CHECK : IMAGEM_NAO} alt={tpl.acessoDashboard ? "Disponível" : "Não Disponível"} className="icone" />
                  <span>Dashboard Analítica</span>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Planos;
