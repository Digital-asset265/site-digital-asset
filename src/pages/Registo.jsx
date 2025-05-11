// src/pages/Registo.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../firebase/authService";

function Registo() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    const { user, error } = await registerUser(email, password);

    if (error) {
      setMensagem(`Firebase: Erro - ${error}`);
    } else {
      setMensagem("✅ Conta criada com sucesso! Verifique o seu email para ativar a conta.");
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0c1c30] text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {mensagem && <p className="text-center text-sm text-red-600 mb-4">{mensagem}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0c1c30] hover:bg-[#1c2d45] text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "A criar conta..." : "Criar conta"}
        </button>
      </form>
    </div>
  );
}

export default Registo;



