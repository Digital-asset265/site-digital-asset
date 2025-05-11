import React from "react";
import Mapa from "../components/Mapa";

function Services() {
  return (
    <div className="text-white py-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Política da Empresa</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="h-[400px]">
          <Mapa />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Cobertura e Proximidade</h2>
          <p className="text-gray-300 text-lg">
            A nossa política de atuação tem como base o respeito territorial: evitamos prestar serviços a empresas da
            mesma área geográfica e do mesmo setor para garantir exclusividade, confiança e resultados sustentáveis.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;

