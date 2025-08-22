import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import AppProvider from './context/AppContext.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
