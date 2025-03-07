import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/Header.tsx";
import Home from "./components/HomeContent.tsx"
import Footer from "./components/Footer.tsx";


// Componente principal App
const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <Header />
    <div>
      <Home />

    </div>
    <Footer />
  </div>
);

// Obtenemos el elemento del DOM y usamos aserción de tipo
const appElement = document.getElementById("app") as HTMLElement;

// Creamos la raíz de React y renderizamos la aplicación
const root = ReactDOM.createRoot(appElement);
root.render(<App />);