import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //Important Note: removed strict mode to avoid double useEffect calling;

  // <React.StrictMode> 
    <App />
  // </React.StrictMode>
);
