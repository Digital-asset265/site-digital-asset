// src/pages/SelecaoPack.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

function SelecaoPack() {
  const navigate = useNavigate();

  const packs = [
    {
      nome: "Standard",
      adesao: 349,
      mensalidade: 100,
      descricao: [
        "Gestão Google Meu Negócio",
        "Relatório mensal com desempenho",
        "Campanha de oferta inicial",
      ],
    },
    {
      nome: "Intermédio",
      adesao: 699,
      mensalidade: 150,
      descricao: [
        "Tudo incluído do Pack Standard",
        "2 campanhas publicitárias (Facebook/Instagram)",
      ],
    },
    {
      nome: "Premium",
      adesao: 1199,
      mensalidade: 200,
      descricao: [
        "Tudo incluído do Pack Intermédio",
        "Criação de Website Profissional",
        "Gerência de Redes Sociais (opcional)",
      ],
      destaque: true,
    },
  ];

  const handleEscolherPack = async (pack) => {
    const user = auth.currentUser;
    if (!user || !user.emailVerified) {
      alert("É necessário confirmar o email antes de escolher um pack.");
      return;
    }

    try {
      const clienteRef = doc(db, "clientesDados", user.email.toLowerCase());
      await updateDoc(clienteRef, {
        packEscolhido: pack.nome,
        adesao: pack.adesao,
        mensalidade: pack.mensalidade,
        selecionadoEm: new Date().toISOString(),
      });

      alert(`Pack ${pack.nome} selecionado com sucesso!`);
      navigate("/cliente");
    } catch (error) {
      console.error("Erro ao guardar pack escolhido:", error);
      alert("Erro ao selecionar o pack. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1c30] text-white flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold mb-8">Escolha o seu Pack</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
        {packs.map((pack) => (
          <div
            key={pack.nome}
            className={`relative bg-white text-black rounded-2xl p-6 shadow-lg flex flex-col items-center justify-between transition-all transform hover:scale-105 z-10 ${
              pack.destaque
                ? "border-2 animate-borderGradient"
                : "border-2 border-gray-300"
            }`}
          >
            <h3 className="text-2xl font-bold mb-4 z-10">{pack.nome}</h3>

            <ul className="text-gray-700 mb-4 space-y-2 text-center z-10">
              {pack.descricao.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>

            <div className="text-center mt-2 text-lg font-semibold z-10">
              {pack.adesao}€ Adesão
            </div>

            <button
              onClick={() => handleEscolherPack(pack)}
              className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded z-10"
            >
              Escolher
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelecaoPack;



