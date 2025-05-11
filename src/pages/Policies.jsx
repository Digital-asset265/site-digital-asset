import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Policies() {
  return (
    <div className="p-8 flex flex-col gap-8">
      {/* Título e ícone */}
      <div className="flex items-center gap-4">
        <img src="/icons/politicas.png" alt="Ícone da empresa" className="w-12 h-12" />
        <h2 className="text-3xl font-bold">Política da Empresa</h2>
      </div>

      {/* Políticas */}
      <div className="bg-white/10 p-6 rounded-lg shadow-md text-white space-y-4">
        <h3 className="text-xl font-semibold mb-4">Termos e Políticas</h3>

        <p><strong>Última atualização:</strong> 11-05-2025</p>

        <p><strong>1. Identificação do Prestador de Serviços</strong><br />
        A Digital Asset é uma empresa especializada em soluções de marketing digital, composta por um grupo de especialistas que atuam em áreas como visibilidade online, publicidade, criação de websites e gestão de redes sociais.
        A empresa opera sob a liderança de André Peixoto, prestador de serviços digitais que colabora com profissionais e ferramentas de excelência para assegurar os melhores resultados para os seus clientes.</p>

        <p><strong>2. Prestação de Serviços</strong><br />
        Os serviços são disponibilizados em três pacotes distintos – Standard, Intermédio e Premium – detalhados na secção 'Serviços' deste website.
        Cada serviço é personalizado conforme as necessidades do cliente e ativado após confirmação de adesão e, quando aplicável, pagamento inicial.</p>

        <p><strong>3. Faturação e Parceria com Terceiros</strong><br />
        A faturação é assegurada através da plataforma Xolo Go, entidade sediada na Estónia e parceira legal da Digital Asset.
        Esta parceria garante que todas as faturas emitidas sejam legalmente válidas e compatíveis com as exigências fiscais nacionais e internacionais.
        Os pagamentos são processados pela conta da Xolo, sendo posteriormente transferidos para o prestador de forma segura e transparente.</p>

        <p><strong>4. Política de Pagamento</strong><br />
        O pagamento deve ser efetuado no prazo indicado na fatura.
        A falta de pagamento poderá resultar em penalizações definidas no documento fiscal e suspensão do serviço até regularização.</p>

        <p><strong>5. Confidencialidade e Proteção de Dados</strong><br />
        Toda a informação fornecida pelos clientes será tratada com confidencialidade.
        Os dados recolhidos serão usados exclusivamente para fins de prestação dos serviços e faturação, em conformidade com o RGPD (Regulamento Geral sobre a Proteção de Dados).</p>

        <p><strong>6. Cancelamento e Reembolsos</strong><br />
        Caso o cliente deseje cancelar um serviço, deverá comunicar com um mínimo de 15 dias úteis de antecedência.
        Serviços já iniciados ou faturas emitidas poderão não ser reembolsáveis, salvo exceções justificadas.</p>

        <p><strong>7. Contactos</strong><br />
        Para esclarecimentos adicionais, entre em contacto com a nossa equipa:<br />
        Email: <strong>digitalasset265@gmail.com</strong><br />
        WhatsApp: <strong>+351 934 882 793</strong></p>
      </div>
    </div>
  );
}

export default Policies;

