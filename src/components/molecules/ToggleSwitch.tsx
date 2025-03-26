import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

/**
 * Composant ToggleSwitch
 * @param {boolean} checked - Indique si le switch est activé
 * @param {function} onChange - Fonction appelée lorsque l'utilisateur active/désactive le switch
 */
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;
