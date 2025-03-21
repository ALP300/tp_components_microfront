import React, { useState, useEffect } from "react";
import logoAbeja from "../assets/logoAbeja.png"; // Logo del Header

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // For fade-in animation on mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "/images/dashboard.png" },
    { href: "/lista-colmenas", label: "Lista de colmenas", icon: "/images/colmena.png" },
    { href: "/camaras", label: "Cámaras", icon: "/images/camara.png" },
    { href: "/gestionar-trabajador", label: "Gestionar Trabajador", icon: "/images/obrero.png" },
    { href: "/configuracion", label: "Configuración", icon: "/images/soporte-tecnico.png" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Toggle Button for Mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-yellow-400 rounded-full hover:bg-yellow-500 hover:scale-110 transition-all duration-300 shadow-md"
        onClick={toggleSidebar}
      >
        <img
          src="/images/menu-icon.svg"
          alt="Menu Icon"
          width={24}
          height={24}
        />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen bg-[#f8f199] flex flex-col p-6 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 shadow-xl rounded-r-2xl font-poppins transform ${
          isMounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        } transition-all duration-500 ease-in-out`}
      >
        {/* Logo and Title */}
        <div className="mb-1 flex items-center justify-center hover:scale-105 transition-transform duration-300">
          <img
            src="/images/logo_ñavishe.png"
            alt="Na Vishe Logo"
            width={180}
            height={120}
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1">
          <ul className="space-y-3">
            {navItems.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-xl text-gray-800 hover:bg-yellow-200 hover:text-black hover:scale-105 hover:shadow-md transition-all duration-300 text-base"
                >
                  <img
                    src={item.icon}
                    alt={`${item.label} Icon`}
                    width={24}
                    height={24}
                  />
                  {item.label}
                </a>
                {index < navItems.length - 1 && (
                  <div
                    className="my-3 border-t border-[rgba(0,0,0,0.2)] hover:border-[rgba(0,0,0,0.4)] hover:border-t-2 transition-all duration-300"
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Separator Line (before Logout) */}
        <div
          className="my-5 border-t border-[rgba(0,0,0,0.2)] hover:border-[rgba(0,0,0,0.4)] hover:border-t-2 transition-all duration-300"
        />

        {/* Logout Button */}
        <div className="mt-auto">
          <a
            href="/logout"
            className="flex items-center gap-4 p-4 rounded-xl text-gray-800 hover:bg-red-200 hover:text-red-700 hover:scale-105 hover:shadow-md transition-all duration-300 text-base"
          >
            <img
              src="/images/cerrar-sesion.png"
              alt="Logout Icon"
              width={24}
              height={24}
            />
            Cerrar Sesión
          </a>
        </div>
      </aside>

      

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Header;