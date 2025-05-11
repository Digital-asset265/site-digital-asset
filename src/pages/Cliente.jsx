import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { logoutUser } from "../firebase/authService";
import { doc, getDoc } from "firebase/firestore";
import { Menu, X } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Cliente() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);
  const [nomeCliente, setNomeCliente] = useState("");
  const [packCliente, setPackCliente] = useState("");
  const [estatisticas, setEstatisticas] = useState(null);
  const [estatisticasComparacao, setEstatisticasComparacao] = useState(null);
  const [dadosGrafico, setDadosGrafico] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user || !user.emailVerified) {
        navigate("/login");
        return;
      }

      const email = user.email.toLowerCase();

      try {
        const docRefDados = doc(db, "clientesDados", email);
        const docSnapDados = await getDoc(docRefDados);

        if (!docSnapDados.exists()) {
          navigate("/formulario");
          return;
        }

        const dados = docSnapDados.data();
        if (dados.nome) setNomeCliente(dados.nome);
        if (dados.packEscolhido) setPackCliente(dados.packEscolhido);

        const docRefStats = doc(db, "clientesEstatisticas", email);
        const docSnapStats = await getDoc(docRefStats);
        if (docSnapStats.exists()) {
          setEstatisticas(docSnapStats.data());
        }

        const docRefComparacao = doc(db, "clientesEstatisticasCont", email);
        const docSnapComparacao = await getDoc(docRefComparacao);
        if (docSnapComparacao.exists()) {
          setEstatisticasComparacao(docSnapComparacao.data());
        }

        const docRefDesempenho = doc(db, "clientesDesempenho", email);
        const docSnapDesempenho = await getDoc(docRefDesempenho);

        if (docSnapDesempenho.exists()) {
          const dados = docSnapDesempenho.data();
          const dadosFormatados = Object.entries(dados)
            .map(([semana, valores]) => ({ semana, ...valores }))
            .sort((a, b) => new Date(a.semana.split("/").reverse().join("/")) - new Date(b.semana.split("/").reverse().join("/")));
          setDadosGrafico(dadosFormatados);
        }

        setCarregando(false);
      } catch (error) {
        console.error("Erro ao carregar dados do cliente:", error);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao terminar sessão:", error.message);
    }
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const irParaInfoPessoal = () => {
    setMenuAberto(false);
    navigate("/cliente-info");
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-[#0c1c30] text-white flex justify-center items-center text-xl">
        A verificar acesso...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1c30] text-white p-6 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold animate-fade-in">
          Bem-vindo{nomeCliente ? `, ${nomeCliente}` : ""}!
        </h1>
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {menuAberto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {packCliente && (
        <p className="text-lg mb-6 animate-fade-in delay-200">
          O seu serviço selecionado é o <strong>pack {packCliente}</strong>. Estamos a exercer os nossos serviços para dar valor à sua empresa.
        </p>
      )}

      {menuAberto && (
        <div className="absolute right-6 top-20 bg-white text-black rounded-xl shadow-lg w-56 p-4 z-20">
          <ul className="space-y-3">
            <li>
              <button onClick={irParaInfoPessoal} className="w-full text-left hover:underline">
                Informações Pessoais
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full text-left text-red-600 hover:underline">
                Terminar Sessão
              </button>
            </li>
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white text-black rounded-xl p-6 shadow-lg animate-fade-in delay-300">
          <h2 className="text-xl font-semibold mb-4">📊 Resultados do Mês</h2>
          {estatisticas ? (
            <>
              <p>👀 Visualizações no Google: {estatisticas.visualizacoes}</p>
              <p>📞 Chamadas: {estatisticas.chamadas}</p>
              <p>🧭 Direções: {estatisticas.direcoes || 0}</p>
              <p>🖱️ Cliques no site: {estatisticas.cliques}</p>
              <p className="text-sm text-gray-600 mt-2">
                Última atualização: {estatisticas.ultimaAtualizacao}
              </p>
            </>
          ) : (
            <p>🔄 Dados ainda a serem processados.</p>
          )}
        </div>

        <div className="bg-white text-black rounded-xl p-6 shadow-lg animate-fade-in delay-500">
          <h2 className="text-xl font-semibold mb-4">📈 Comparação Semanal</h2>
          {estatisticasComparacao ? (
            <>
              <p>👀 Visualizações: {estatisticasComparacao.visualizacoes}</p>
              <p>📞 Chamadas: {estatisticasComparacao.chamadas}</p>
              <p>🧭 Direções: {estatisticasComparacao.direcoes || 0}</p>
              <p>🖱️ Cliques: {estatisticasComparacao.cliques}</p>
              <p className="text-sm text-gray-600 mt-2">
                Atualizado: {estatisticasComparacao.ultimaAtualizacao}
              </p>
            </>
          ) : (
            <p>⏳ Nenhum dado de comparação disponível ainda.</p>
          )}
        </div>
      </div>

      <div className="mt-10 bg-white text-black rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">📈 Desempenho Semanal</h2>
        {dadosGrafico.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosGrafico} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semana" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="visualizacoes" stroke="#8884d8" name="Visualizações" />
              <Line type="monotone" dataKey="cliques" stroke="#82ca9d" name="Cliques" />
              <Line type="monotone" dataKey="chamadas" stroke="#ff7300" name="Chamadas" />
              <Line type="monotone" dataKey="direcoes" stroke="#ff0000" name="Direções" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-700">Ainda não há dados semanais disponíveis.</p>
        )}
      </div>
    </div>
  );
}

export default Cliente;








