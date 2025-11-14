import "./Planos.css";
import IMAGEM_USER from "./user-circle-svgrepo-com.svg";


const Planos = () => {
  return (
    <div className="planos-container">
      <h1 className="titulo-planos">
        O <span className="destaque">plano ideal</span> para o seu negócio, tem
        na I9Tech!
      </h1>
      <p className="subtitulo">
        Comece a gerenciar seu negocio por um preço que cabe no seu bolso!
      </p>

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
        <button className="ativo">Mensal</button>
        <button>
          Anual <span className="economia">(economize até R$1.300)</span>
        </button>
      </div>

      <div className="cards">

        <div className="card-planos">
          <h2>Essencial</h2>
          <p>
            Para quem quer fazer a gestão completa do negócio em uma única
            plataforma
          </p>
          <h3>R$99,00<span>/mês</span></h3>
          <button className="btn-secondary">Comece grátis</button>
          <ul>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <img src={IMAGEM_USER} alt="Usuário" className="icone" />
              <span>10 Usuários</span>
            </li>
            <li>👤 2 Super Usuários</li>
            <li>🚫 Envio de relatório WhatsApp</li>
            <li>🚫 Dashboard Analítica</li>
          </ul>
        </div>

        <div className="card-planos destaque-card">
          <h2>Profissional</h2>
          <p>
            Para quem busca otimizar os processos da empresa com automações e
            dashboards
          </p>
          <h3>R$249,00<span>/mês</span></h3>
          <button className="btn-secondary">Comece grátis</button>
          <ul>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <img src={IMAGEM_USER} alt="Usuário" className="icone" /> 35 Usuários</li>
            <li>👤 4 Super Usuários</li>
            <li>🚫 Envio de relatório WhatsApp</li>
            <li>✅ Dashboard Analítica</li>



          </ul>
        </div>

        <div className="card-planos">
          <h2>Premium</h2>
          <p>
            Para quem quer crescer o negócio com recursos para alta performance
          </p>
          <h3>R$499,00<span>/mês</span></h3>
          <button className="btn-secondary">Comece grátis</button>
          <ul>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <img src={IMAGEM_USER} alt="Usuário" className="icone" /> Ilimitados usuários</li>
            <li> 10 Super Usuários</li>
            <li>✅ Envio de relatório WhatsApp</li>
            <li>✅ Dashboard Analítica</li>

          </ul>
        </div>

      </div>
    </div>
  );
};

export default Planos;
