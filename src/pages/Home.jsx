import React from 'react';

function Home() {
  const toggleChat = () => {
    const chat = document.getElementById("chat-window");
    chat.style.display = chat.style.display === "flex" ? "none" : "flex";
  };

  const showMessage = (type) => {
    const response = document.getElementById("chat-response");
    let message = "";
    switch (type) {
      case "email":
        message = "Pode enviar-nos um email diretamente para: digitalasset265@gmail.com Respondemos o mais rápido possível!";
        break;
      case "agendar":
        message = "Pode agendar a sua análise gratuita através do email ou via WhatsApp. Informe-nos sobre o seu negócio!";
        break;
      case "servicos":
        message = "Oferecemos três pacotes: Standard, Intermédio e Premium. Veja mais detalhes na secção 'Serviços' do site.";
        break;
      case "ajuda":
        message = "Se precisar de apoio, estamos disponíveis por email ou WhatsApp. Estamos aqui para ajudar no crescimento digital da sua empresa.";
        break;
    }
    response.innerHTML = `<p class='text-sm text-white border border-white p-3 rounded-md mt-2'>${message}</p>`;
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Botões sociais personalizados - canto superior direito */}
      <div className="fixed top-6 right-6 flex flex-col items-end space-y-3 z-50">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/digital.asset265/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 hover:ring-2 hover:ring-white hover:bg-white/10 transition"
          title="Instagram"
        >
          <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6" />
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/profile.php?id=61575324220292"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 hover:ring-2 hover:ring-white hover:bg-white/10 transition"
          title="Facebook"
        >
          <img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6" />
        </a>

        {/* WhatsApp - scroll interno */}
        <a
          href="#contacto"
          className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 hover:ring-2 hover:ring-white hover:bg-white/10 transition"
          title="WhatsApp"
        >
          <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-6 h-6" />
        </a>

        {/* Política da Empresa - scroll até fundo */}
        <button
          onClick={scrollToBottom}
          className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 hover:ring-2 hover:ring-white hover:bg-white/10 transition"
          title="Política da Empresa"
        >
          <img src="/icons/politicas.png" alt="Política" className="w-6 h-6" />
        </button>
      </div>

      {/* Secção Hero */}
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/perfilsite.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />
        <div className="hidden md:block absolute left-10 top-1/2 transform -translate-y-1/2 z-10">
          <div className="w-[250px] h-auto relative">
            <img src="/images/telefone.png" alt="Phone Mockup" className="w-full h-auto" />
          </div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-[#00aaff]">Digital</span>{" "}
              <span className="text-bluelight">Asset</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10">
              A nossa prioridade é satisfazer as suas necessidades.
            </p>
            <a
              href="#services"
              className="bg-[#00aaff] text-white px-6 py-3 rounded-md text-lg font-semibold shadow-lg hover:bg-[#0095dd] transition"
            >
              Conhecer Serviços
            </a>
          </div>
        </div>

        <div
          id="chat-icon"
          onClick={toggleChat}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "transparent",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            cursor: "pointer",
            zIndex: 9999,
          }}
        >
          <img src="/icons/chat.png" alt="Chat" style={{ width: "32px", height: "32px" }} />
        </div>

        <div
          id="chat-window"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "280px",
            background: "#0c1c30",
            borderRadius: "20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            display: "none",
            flexDirection: "column",
            zIndex: 9999,
            overflow: "hidden",
            color: "white",
          }}
        >
          <div style={{ background: "#004AAD", color: "#fff", padding: "12px", fontWeight: "bold", textAlign: "center" }}>
            Precisa de ajuda?
          </div>
          <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <p style={{ fontWeight: "500" }}>Escolha uma das opções abaixo:</p>
            <button style={btnStyle} onClick={() => showMessage("email")}>
              Como posso contactar a Digital Asset?
            </button>
            <button style={btnStyle} onClick={() => showMessage("agendar")}>
              Como agendar uma análise gratuita?
            </button>
            <button style={btnStyle} onClick={() => showMessage("servicos")}>
              Que serviços oferecem?
            </button>
            <button style={btnStyle} onClick={() => showMessage("ajuda")}>
              Preciso de ajuda urgente!
            </button>
            <div id="chat-response"></div>
          </div>
        </div>
      </section>

      {/* Secção de Serviços */}
      <section id="services" className="bg-blue py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-10">Os Nossos Serviços</h2>
        <p className="text-white max-w-3xl mx-auto mb-12 text-lg">
          Abaixo será apresentado a descrição de cada pack oferecido pela Digital Asset.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Pack Standard</h3>
            <p>• Gestão Google Meu Negócio  • Impulso de avaliação e visibilidade do Google meu negócio  • Relatório mensal com avaliações referente ao anterior</p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Pack Intermédio</h3>
            <p>• Inclui tudo do pack Standard  • Publicidade em Redes Sociais</p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Pack Premium</h3>
            <p>• Inclui tudo do pack Intermédio  • Criação de Website Profissional  • Gestão de redes sociais (opcional)</p>
          </div>
        </div>
      </section>

      {/* Secção de Contacto */}
      <section id="contacto" className="bg-[#0c1c30] py-20 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Contacte-nos</h3>
        <p className="text-gray-300">
          Envie-nos já um email para agendar a sua análise gratuita, para o{" "}
          <strong>digitalasset265@gmail.com</strong>
          <br />
          Contacte o nosso WhatsApp através do <strong>+351 934 882 793</strong>
        </p>
      </section>
    </>
  );
}

const btnStyle = {
  background: "transparent",
  border: "1px solid white",
  padding: "8px 10px",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
};

export default Home;

         