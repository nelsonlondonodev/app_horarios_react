import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col w-full">
      

      {/* Main content area */}
      <main className="flex-grow py-4 w-full">
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
