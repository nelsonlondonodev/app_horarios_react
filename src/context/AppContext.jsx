import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'; // Importamos nuestro cliente de Supabase

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Escuchamos los cambios en el estado de autenticación de Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user;

        if (user) {
          // Si hay un usuario autenticado, buscamos su perfil en nuestra tabla 'employees'
          const { data: profile, error } = await supabase
            .from('employees')
            .select('*')
            .eq('user_id', user.id)
            .single(); // .single() porque esperamos un solo resultado

          if (error) {
            console.error('Error fetching user profile:', error);
            setCurrentUser(null);
          } else {
            setCurrentUser(profile);
          }
        } else {
          // Si no hay sesión de usuario, el currentUser es null
          setCurrentUser(null);
        }
        setLoading(false);
      }
    );

    // Limpiamos el listener cuando el componente se desmonta para evitar fugas de memoria
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    loading,
    // Aquí añadiremos más adelante las funciones para leer/escribir turnos
  };

  // Para evitar parpadeos o vistas incorrectas, no renderizamos la app
  // hasta que sepamos si hay un usuario logueado o no.
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};