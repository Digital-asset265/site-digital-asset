import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Formulario() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({
    nome: "",
    nif: "",
    morada: "",
    codigoPostal: "",
    localidade: "",
    pais: "",
    telefone: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [emailVerificado, setEmailVerificado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          setEmailVerificado(true);

          // Carrega dados existentes se já houver
          const docRef = doc(db, "clientesDados", user.email.toLowerCase());
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const existentes = docSnap.data();
            setDados((prev) => ({ ...prev, ...existentes }));
          }
        }
      }
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Agora o cliente pode apagar letras normalmente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user || !user.emailVerified) {
      setMensagem("Por favor confirme o seu email antes de preencher o formulário.");
      return;
    }

    try {
      await setDoc(doc(db, "clientesDados", user.email.toLowerCase()), {
        ...dados,
        email: user.email.toLowerCase(),
        criadoEm: new Date().toISOString(),
      });

      setMensagem("Formulário enviado com sucesso! A redirecionar...");
      setTimeout(() => {
        navigate("/selecao-pack");
      }, 2000);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setMensagem("Erro ao enviar o formulário. Tente novamente.");
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-[#0c1c30] text-white flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!emailVerificado) {
    return (
      <div className="min-h-screen bg-[#0c1c30] text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Confirmação de Email</h2>
        <p className="mb-4 text-center">
          Por favor, confirme o seu email antes de preencher o formulário.
          <br />
          Verifique a sua caixa de entrada e spam!
        </p>
        <button
          onClick={async () => {
            try {
              await auth.currentUser.sendEmailVerification();
              alert("Email de verificação reenviado!");
            } catch (error) {
              console.error("Erro ao reenviar email:", error);
            }
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Reenviar Email de Verificação
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1c30] text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Inscrição Inicial</h2>

        <p className="text-sm text-red-600 text-center mb-4 font-medium">
          * Todos os campos obrigatórios devem ser preenchidos corretamente. Após submissão, não é possível apagar os dados preenchidos.
        </p>

        {[
          { label: "Nome Completo", name: "nome" },
          { label: "NIF", name: "nif" },
          { label: "Morada", name: "morada" },
          { label: "Código Postal", name: "codigoPostal" },
          { label: "Localidade", name: "localidade" },
          { label: "País", name: "pais" },
          { label: "Telefone (opcional)", name: "telefone" },
        ].map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block mb-1 font-semibold">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={dados[field.name]}
              onChange={handleChange}
              required={field.name !== "telefone"}
              placeholder={field.name !== "telefone" ? "Campo obrigatório" : "Opcional"}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        {mensagem && (
          <p className="text-center text-sm mb-4 text-red-500">{mensagem}</p>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Enviar Dados
        </button>
      </form>
    </div>
  );
}

export default Formulario;





