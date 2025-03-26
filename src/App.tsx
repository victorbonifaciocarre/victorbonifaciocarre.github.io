import React from "react";
import CurrencyConverter from "./components/organisms/CurrencyConverter";
import "./App.css";

/**
 * Composant principal de l'application
 * Affiche le convertisseur de devises
 */
const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Convertisseur de devises</h1>
      <CurrencyConverter />
    </div>
  );
};

export default App;
