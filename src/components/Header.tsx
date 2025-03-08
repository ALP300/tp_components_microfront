import React from "react";
import logoAbeja from "../assets/logoAbeja.png"; // Ajusta la ruta según la ubicación real

const Header = () => {
    return (
        <div>
            <img src={logoAbeja} alt="Bee Logo" width="150" />
            <h1>Hola Mundo</h1>
        </div>
    );
};

export default Header;
