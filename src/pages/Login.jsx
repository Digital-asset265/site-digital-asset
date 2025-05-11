import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { loginUser } from "../firebase/authService";
import { auth } from "../firebase/config";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    const { user, error } = await loginUser(email, password);

    if (error) {
      setMensagem("Email ou password incorretos. Tente novamente.");
    } else if (!user.emailVerified) {
      setMensagem("⚠️ Verifique o seu email antes de continuar.");
    } else {
      navigate("/cliente");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0c1c30] text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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

        <div className="mb-6 relative">
          <label className="block mb-1 font-semibold">Password:</label>
          <input
            type={mostrarPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded pr-10"
          />
          {password && (
            <button
              type="button"
              onClick={() => setMostrarPassword(!mostrarPassword)}
              className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-500"
            >
              {mostrarPassword ? "🙈" : "👁️"}
            </button>
          )}
        </div>

        {mensagem && <p className="text-center text-sm text-red-600 mb-4">{mensagem}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "A entrar..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default Login;




