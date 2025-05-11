// src/pages/Admin.jsx

import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { logoutUser, deleteUserFromFirestore } from "../firebase/authService";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/auth";

function Admin() {
  const [users, setUsers] = useState([]);
  const [clientesDados, setClientesDados] = useState({});
  const [clientesAutorizados, setClientesAutorizados] = useState([]);
  const [expandedUsers, setExpandedUsers] = useState([]);
  const [novoEmail, setNovoEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const [modoEdicao, setModoEdicao] = useState({});
  const [dadosEditados, setDadosEditados] = useState({});

  const [estatisticasCont, setEstatisticasCont] = useState({
    visualizacoes: "",
    cliques: "",
    chamadas: "",
    direcoes: "",
    ultimaAtualizacao: ""
  });
  const [mensagemCont, setMensagemCont] = useState("");
  // 📊 Dados de desempenho semanal
  const [emailDesempenho, setEmailDesempenho] = useState("");
  const [novaSemana, setNovaSemana] = useState("");
  const [dadosSemana, setDadosSemana] = useState({
    visualizacoes: "",
    cliques: "",
    chamadas: ""
});
const [mensagemDesempenho, setMensagemDesempenho] = useState("");
 
  const [emailEstatistica, setEmailEstatistica] = useState("");
  const [estatisticas, setEstatisticas] = useState({
    visualizacoes: "",
    cliques: "",
    chamadas: "",
    direcoes: "",
    ultimaAtualizacao: ""
  });
  const [mensagemEstatistica, setMensagemEstatistica] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== "digitalasset265@gmail.com") {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const dadosSnapshot = await getDocs(collection(db, "clientesDados"));
        const autorizadosSnapshot = await getDocs(collection(db, "clientesAutorizados"));

        const userList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const dadosMap = {};
        dadosSnapshot.docs.forEach(doc => {
          dadosMap[doc.id] = doc.data();
        });
        const autorizados = autorizadosSnapshot.docs.map(doc => doc.id);

        setUsers(userList);
        setClientesDados(dadosMap);
        setClientesAutorizados(autorizados);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setErro("Erro ao carregar dados.");
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (email) => {
    setExpandedUsers(prev =>
      prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
    );
  };

  const handleDelete = async (email) => {
    if (!confirm("Tem a certeza que quer apagar este utilizador?")) return;
    try {
      await deleteUserFromFirestore(email);
      await deleteDoc(doc(db, "users", email));
      const updated = users.filter(user => user.email !== email);
      setUsers(updated);
    } catch (error) {
      console.error("Erro ao apagar utilizador:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao terminar sessão:", error.message);
    }
  };

  const handleAdicionarEmail = async () => {
    if (!novoEmail.trim()) {
      setMensagem("Por favor, introduza um email válido.");
      return;
    }

    try {
      await setDoc(doc(db, "clientesAutorizados", novoEmail.trim().toLowerCase()), {
        email: novoEmail.trim().toLowerCase(),
        autorizadoEm: new Date().toISOString(),
      });
      setMensagem("✅ Email autorizado com sucesso!");
      setNovoEmail("");
    } catch (error) {
      console.error("Erro ao autorizar email:", error);
      setMensagem("❌ Erro ao autorizar email.");
    }
  };

  const iniciarEdicao = (email) => {
    setModoEdicao(prev => ({ ...prev, [email]: true }));
    setDadosEditados({ ...clientesDados[email] });
  };

  const cancelarEdicao = (email) => {
    setModoEdicao(prev => ({ ...prev, [email]: false }));
    setDadosEditados({});
  };

  const handleInputChange = (campo, valor) => {
    setDadosEditados(prev => ({ ...prev, [campo]: valor }));
  };

  const guardarAlteracoes = async (email) => {
    try {
      await setDoc(doc(db, "clientesDados", email), {
        ...clientesDados[email],
        ...dadosEditados,
      });
      setModoEdicao(prev => ({ ...prev, [email]: false }));
      setDadosEditados({});
      window.location.reload();
    } catch (error) {
      console.error("Erro ao guardar alterações:", error);
      alert("Erro ao guardar alterações.");
    }
  };

  const carregarEstatisticas = async () => {
    if (!emailEstatistica.trim()) return;
    try {
      const docRef = doc(db, "clientesEstatisticas", emailEstatistica.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEstatisticas(docSnap.data());
        setMensagemEstatistica("Estatísticas carregadas.");
      } else {
        setEstatisticas({
          visualizacoes: "",
          cliques: "",
          chamadas: "",
          direcoes: "",
          ultimaAtualizacao: ""
        });
        setMensagemEstatistica("Nenhum dado encontrado. Pode criar novos valores.");
      }
      await carregarEstatisticasCont();
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
      setMensagemEstatistica("Erro ao carregar estatísticas.");
    }
  };

  const carregarEstatisticasCont = async () => {
    if (!emailEstatistica.trim()) return;
    try {
      const docRef = doc(db, "clientesEstatisticasCont", emailEstatistica.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEstatisticasCont(docSnap.data());
        setMensagemCont("Estatísticas contínuas carregadas.");
      } else {
        setEstatisticasCont({
          visualizacoes: "",
          cliques: "",
          chamadas: "",
          direcoes: "",
          ultimaAtualizacao: ""
        });
        setMensagemCont("Nenhum dado contínuo encontrado.");
      }
    } catch (error) {
      console.error("Erro ao carregar estatísticas contínuas:", error);
      setMensagemCont("Erro ao carregar estatísticas contínuas.");
    }
  };

  const atualizarEstatisticas = async () => {
    try {
      await setDoc(doc(db, "clientesEstatisticas", emailEstatistica.toLowerCase()), estatisticas);
      setMensagemEstatistica("✅ Estatísticas atualizadas com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar estatísticas:", error);
      setMensagemEstatistica("Erro ao atualizar.");
    }
  };

  const atualizarEstatisticasCont = async () => {
    try {
      await setDoc(doc(db, "clientesEstatisticasCont", emailEstatistica.toLowerCase()), estatisticasCont);
      setMensagemCont("✅ Estatísticas contínuas atualizadas com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar estatísticas contínuas:", error);
      setMensagemCont("Erro ao atualizar estatísticas contínuas.");
    }
  };

  const guardarDesempenhoSemanal = async () => {
    if (!emailDesempenho) {
      setMensagemDesempenho("Preencha o email.");
      return;
    }
  
    const dataHoje = new Date();
    const dataFormatada = dataHoje.toLocaleDateString("pt-PT"); // Ex: 08/05/2025
  
    try {
      const docRef = doc(db, "clientesDesempenho", emailDesempenho);
      await setDoc(docRef, {
        [dataFormatada]: dadosSemana
      }, { merge: true });
  
      setMensagemDesempenho("✅ Desempenho guardado com sucesso!");
      setNovaSemana(""); // opcional agora
      setDadosSemana({ visualizacoes: "", cliques: "", chamadas: "", direcoes: "" });
    } catch (error) {
      console.error("Erro ao guardar desempenho:", error);
      setMensagemDesempenho("Erro ao guardar desempenho.");
    }
  };
  
  

  return (
    <>
      <div className="min-h-screen bg-[#0c1c30] text-white p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Admin</h1>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded">
            Terminar Sessão
          </button>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AUTORIZAR EMAIL */}
          <div className="bg-white text-black rounded-xl p-4 shadow-lg h-fit max-h-[500px] overflow-auto">
            <h2 className="text-2xl font-semibold mb-4">Autorizar Novo Cliente</h2>
            <div className="flex space-x-2 mb-2">
              <input
                type="email"
                placeholder="Email do cliente"
                value={novoEmail}
                onChange={(e) => setNovoEmail(e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={handleAdicionarEmail}
                className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded text-white"
              >
                Autorizar
              </button>
            </div>
            {mensagem && <p className="text-sm text-gray-700 text-center">{mensagem}</p>}
  
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Emails Autorizados:</h3>
              <ul className="text-sm space-y-1">
                {clientesAutorizados.map((email) => (
                  <li key={email}>✔ {email}</li>
                ))}
              </ul>
            </div>
          </div>
  
          {/* CLIENTES REGISTADOS */}
          <div className="bg-white text-black rounded-xl p-4 shadow-lg h-fit max-h-[500px] overflow-auto">
            <h2 className="text-2xl font-semibold mb-4">Clientes Registados</h2>
            {erro && <p className="text-red-500 mb-4">{erro}</p>}
            <ul className="space-y-4">
              {users.map((user) => (
                <li key={user.id} className="bg-gray-100 p-4 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{user.email}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleExpand(user.email)}
                        className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded text-white"
                      >
                        {expandedUsers.includes(user.email) ? "Recolher" : "Ver detalhes"}
                      </button>
                      {clientesDados[user.email] && (
                        <button
                          onClick={() => iniciarEdicao(user.email)}
                          className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white"
                        >
                          Editar
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(user.email)}
                        className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded text-white"
                      >
                        Apagar
                      </button>
                    </div>
                  </div>
  
                  {expandedUsers.includes(user.email) && clientesDados[user.email] && (
                    <div className="mt-4 text-sm space-y-2">
                      {!modoEdicao[user.email] ? (
                        Object.entries(clientesDados[user.email]).map(([key, value]) => (
                          <p key={key}><strong>{key}:</strong> {value}</p>
                        ))
                      ) : (
                        <>
                          {Object.entries(clientesDados[user.email]).map(([key, value]) => {
                            const camposBloqueados = ["email", "criadoEm", "adesao", "mensalidade", "packEscolhido"];
                            if (camposBloqueados.includes(key)) {
                              return <p key={key}><strong>{key}:</strong> {value}</p>;
                            }
                            return (
                              <div key={key} className="flex flex-col">
                                <label className="text-xs text-gray-600 font-semibold">{key}</label>
                                <input
                                  type="text"
                                  value={dadosEditados[key] || ""}
                                  onChange={(e) => handleInputChange(key, e.target.value)}
                                  className="p-2 border rounded"
                                />
                              </div>
                            );
                          })}
                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={() => guardarAlteracoes(user.email)}
                              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={() => cancelarEdicao(user.email)}
                              className="bg-gray-400 hover:bg-gray-500 px-3 py-1 rounded text-white"
                            >
                              Cancelar
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
  
        {/* BLOCO DE ESTATÍSTICAS E COMPARAÇÃO */}  
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Estatísticas principais */}
          <div className="bg-white text-black p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Estatísticas dos Clientes</h2>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Email do Cliente:</label>
              <input
                type="email"
                value={emailEstatistica}
                onChange={(e) => setEmailEstatistica(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={carregarEstatisticas}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Carregar Estatísticas
              </button>
            </div>
  
            {Object.entries(estatisticas).map(([key, value]) => (
              <div key={key} className="mb-3">
                <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setEstatisticas((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
  
            {mensagemEstatistica && (
              <p className="text-sm text-center mt-2 text-green-600">{mensagemEstatistica}</p>
            )}
  
            <button
              onClick={atualizarEstatisticas}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Atualizar Estatísticas
            </button>
          </div>
  
          {/* Comparação contínua */}
          <div className="bg-white text-black p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Comparação Contínua</h2>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Email do Cliente:</label>
              <input
                type="email"
                value={emailEstatistica}
                onChange={(e) => setEmailEstatistica(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
  
            {Object.entries(estatisticasCont).map(([key, value]) => (
              <div key={key} className="mb-3">
                <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setEstatisticasCont((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
  
            {mensagemCont && (
              <p className="text-sm text-center mt-2 text-green-600">{mensagemCont}</p>
            )}
  
            <button
              onClick={atualizarEstatisticasCont}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Atualizar Comparação
            </button>
          </div>
        </div>
  
        {/* Desempenho Semanal */}
        <div className="mt-10 bg-white text-black p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">📈 Gráfico de Desempenho Semanal</h2>
  
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Email do Cliente:</label>
            <input
              type="email"
              value={emailDesempenho}
              onChange={(e) => setEmailDesempenho(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
  
          <div className="mb-4">
            <label className="block mb-1 font-semibold">data de hoje:</label>
            <input
              type="text"
              placeholder="ex: 08-05-2025, 15-05-2025..."
              value={novaSemana}
              onChange={(e) => setNovaSemana(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
  
          {Object.entries(dadosSemana).map(([key, value]) => (
            <div key={key} className="mb-3">
              <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  setDadosSemana((prev) => ({ ...prev, [key]: e.target.value }))
                }
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
  
          {mensagemDesempenho && (
            <p className="text-sm text-center mt-2 text-green-600">{mensagemDesempenho}</p>
          )}
  
          <button
            onClick={guardarDesempenhoSemanal}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Guardar Desempenho
          </button>
        </div>
      </div>
    </>
  );
  


  

}

export default Admin;















