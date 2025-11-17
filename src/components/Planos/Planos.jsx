import "./Planos.css";
import IMAGEM_USER from "../../assets/usuario.svg";
import IMAGEM_SUPERUSER from "../../assets/icon-adminn.svg";
import IMAGEM_NAO from "../../assets/block.svg";
import IMAGEM_CHECK from "../../assets/check.svg";

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
          <p>
            Para quem busca otimizar os processos da empresa com automações e
            dashboards
          </p>
          <h3>R$249,00<span>/mês</span></h3>
          <button className="btn-secondary">Comece grátis</button>
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
          <p>
            Para quem quer crescer o negócio com recursos para alta performance
          </p>
          <h3>R$499,00<span>/mês</span></h3>
          <button className="btn-secondary">Comece grátis</button>
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
