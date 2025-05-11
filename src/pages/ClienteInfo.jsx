import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

function ClienteInfo() {
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user || !user.emailVerified) {
        navigate("/login");
        return;
      }

      try {
        const email = user.email.toLowerCase();
        const docRef = doc(db, "clientesDados", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const dados = docSnap.data();

          if (dados && typeof dados === "object") {
            setDados(dados);
          } else {
            console.warn("Dados inválidos:", dados);
            setMensagem("Dados não encontrados.");
          }
        } else {
          console.warn("Documento não existe no Firestore.");
          setMensagem("Dados não encontrados.");
        }
      } catch (error) {
        console.error("Erro ao carregar dados do cliente:", error);
        setMensagem("Erro ao carregar dados.");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!dados || typeof dados !== "object") {
    return (
      <div className="min-h-screen bg-[#0c1c30] text-white flex justify-center items-center">
        Erro: dados inválidos ou não encontrados.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1c30] text-white p-6">
      <div className="max-w-xl mx-auto bg-white text-black p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">As suas Informações</h2>

        {Object.entries(dados).map(([campo, valor]) => (
          campo !== "email" &&
          campo !== "criadoEm" &&
          campo !== "selecionadoEm" &&
          valor !== undefined &&
          valor !== null && (
            <div className="mb-4" key={campo}>
              <label className="block mb-1 font-semibold capitalize">{campo}</label>
              <input
                type="text"
                name={campo}
                value={valor}
                disabled
                className="w-full p-2 border rounded bg-gray-100 text-gray-600"
              />
            </div>
          )
        ))}

        {mensagem && <p className="text-center text-sm text-green-700 mb-4">{mensagem}</p>}

        <div className="flex justify-end">
          <button
            onClick={() => navigate("/cliente")}
            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClienteInfo;







