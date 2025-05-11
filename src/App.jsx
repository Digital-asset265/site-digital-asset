import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Policies from "./pages/Policies";
import Registo from "./pages/Registo";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Cliente from "./pages/Cliente";
import Formulario from "./pages/Formulario"; // <== IMPORTA o Formulário
import Navbar from "./components/Navbar";
import SelecaoPack from "./pages/SelecaoPack"
import ClienteInfo from "./pages/ClienteInfo";

function App() {
  return (
    <Router>
      <div className="bg-[#0c1c30] text-white min-h-screen">
        <Navbar />

        <Routes>
          {/* Página principal com todas as secções */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <Services />
                <About />
                <Policies />
              </>
            }
          />

          {/* Rotas separadas para outras páginas */}
          <Route path="/registo" element={<Registo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/formulario" element={<Formulario />} /> {/* <== Adiciona a Rota do Formulário */}
          <Route path="/selecao-pack" element={<SelecaoPack />} />
          <Route path="/cliente-info" element={<ClienteInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

