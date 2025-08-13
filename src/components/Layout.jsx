import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      {/* Navbar placeholder */}
      <header className="bg-amber-50 shadow p-4">
        <nav className="w-full flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-stone-800">Gestión de Horarios</h1>
          {/* Navigation links will go here */}
        </nav>
      </header>

      {/* Main content area */}
      <main className="flex-grow py-4">
        {children}
      </main>

      {/* Footer placeholder */}
      <footer className="bg-stone-800 text-white p-4 text-center">
        <p>&copy; 2023 Gestión de Horarios. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Layout;
