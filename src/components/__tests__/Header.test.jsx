import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Header from '../Header';

describe('Header', () => {
  it('renders correctly when a user is logged in', () => {
    const currentUser = { name: 'Test User', role: 'admin' };
    render(
      <AppContext.Provider value={{ currentUser, logout: () => {} }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AppContext.Provider>
    );

    expect(screen.getByText('Gestión de Horarios')).toBeInTheDocument();
    expect(screen.getByText(/Hola, Test User/)).toBeInTheDocument();
    expect(screen.getByText('Salir')).toBeInTheDocument();
  });

  it('does not render when no user is logged in', () => {
    const { container } = render(
      <AppContext.Provider value={{ currentUser: null }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AppContext.Provider>
    );

    expect(container.firstChild).toBeNull();
  });
});
