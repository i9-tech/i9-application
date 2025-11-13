import "./Planos.css";

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
          <h2>Mercúrio</h2>
          <p>
            Para quem quer fazer a gestão completa do negócio em uma única
            plataforma
          </p>
          <h3>R$110<span>/mês</span></h3>
          <button className="btn-secondary">Comece grátis</button>
          <ul>
            <li>👤 10 usuários</li>
          </ul>
        </div>

        <div className="card-planos destaque-card">
          <h2>Titânio</h2>
          <p>
            Para quem busca otimizar os processos da empresa com automações e
            dashboards
          </p>
          <h3>R$185<span>/mês</span></h3>
          <button className="btn-secondary">Comece grátis</button>
          <ul>
            <li>👤 15 usuários</li>
          </ul>
        </div>

        <div className="card-planos">
          <h2>Platina</h2>
          <p>
            Para quem quer crescer o negócio com recursos para alta performance
          </p>
          <h3>R$450<span>/mês</span></h3>
          <button className="btn-secondary">Fale com vendas</button>
          <ul>
            <li>👤 50 usuários</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Planos;
