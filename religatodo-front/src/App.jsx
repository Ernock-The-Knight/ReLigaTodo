import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import logo from "./assets/religatodo.png";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Footer } from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  // 🆕 Estado para controlar se a bolinha deve aparecer ou não
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 🆕 useEffect que monitora o scroll da página
  useEffect(() => {
    const handleScroll = () => {
      // Se o usuário rolar a página para baixo mais que 300 pixels, a bolinha aparece
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🆕 Função que leva a página suavemente para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

  return (
    <>
      <main>
        <Hero />
        {/* Outras seções viriam aqui */}
      </main>
      <Footer />

      {/* 🆕 Bolinha com animação de fade-in, escala e ícone SVG */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-top-btn" // <-- Adicionei uma classe para o CSS cuidar do Hover
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--brand-blue)',
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // 🚀 Animação de entrada e saída: flutua e aparece devagar
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: showScrollTop ? '1' : '0',
            transform: showScrollTop ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
            pointerEvents: showScrollTop ? 'auto' : 'none',
          }}
        >
          {/* 🆕 Ícone de seta bem mais moderno e bonitinho (SVG) */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
}

export default App;