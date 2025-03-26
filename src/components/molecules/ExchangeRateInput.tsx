import React from "react";

interface ExchangeRateInputProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFixed: boolean;
  isUpdated: boolean;
  isOverwritten: boolean;
}

/**
 * Composant pour afficher et modifier le taux de change
 * @param {number} value - Valeur actuelle du taux
 * @param {function} onChange - Fonction appelée lors d'une modification du taux
 * @param {boolean} isFixed - Indique si le taux est fixé manuellement
 * @param {boolean} isUpdated - Indique si le taux a été mis à jour automatiquement
 * @param {boolean} isOverwritten - Indique si le taux a été écrasé
 */
const ExchangeRateInput: React.FC<ExchangeRateInputProps> = ({
  value,
  onChange,
  isFixed,
  isUpdated,
  isOverwritten,
}) => {
  return (
    <div>
      <label>Taux de change :</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        step="0.001"
        lang="en"
        className={`exchange-rate-input
          ${isFixed ? "forced-rate" : ""}
          ${isUpdated ? "updated-rate" : ""}
          ${isOverwritten ? "overwritten-rate" : ""}`}
      />
    </div>
  );
};

export default ExchangeRateInput;
