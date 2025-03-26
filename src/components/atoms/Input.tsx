import React from "react";

interface InputProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  devise: "EUR" | "USD";
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Input générique utilisé dans toute l'application.
 *
 * @param {string | number} value - Valeur actuelle du champ
 * @param {function} onChange - Fonction appelée lors du changement de valeur
 * @param {string} [placeholder] - Texte indicatif facultatif
 * @returns {JSX.Element} - Composant de champ de saisie
 */
const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  devise,
  disabled = false,
}) => {
  return (
    <>
      <label className="currency-label">{devise}</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="input-field"
      />
    </>
  );
};

export default Input;
