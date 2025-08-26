import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAppContext } from '../context/useAppContext';

const LoginView = () => {
  const { currentUser } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // El listener en AppContext se encargará de la redirección
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Si ya hay un usuario, mostramos un mensaje y el botón de logout
  if (currentUser) {
    return (
      <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Bienvenido, {currentUser.name}</h2>
        <p className="text-center mb-6">Ya has iniciado sesión.</p>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? 'Cerrando sesión...' : 'Cerrar Sesión'}
        </button>
        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
      </div>
    );
  }

  // Si no hay usuario, mostramos el formulario de login
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-xs m-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Contraseña
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                <div className="flex items-center justify-between">
                <button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                </button>
                </div>
                {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
            </form>
        </div>
    </div>
  );
};

export default LoginView;
