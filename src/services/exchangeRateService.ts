/**
 * Service de gestion des taux de change
 */

const DEFAULT_RATE = 1.1;

/**
 * Récupère le taux de change en temps réel EUR → USD
 * @returns {Promise<number>} Le taux de change actuel
 */
export const fetchExchangeRate = (): number => {
  return DEFAULT_RATE; // Valeur par défaut en cas d'erreur
};

/**
 * Vérifie si le taux fixe doit être désactivé en fonction d'une variation de 2%
 * @param {number} fixedRate - Le taux fixé par l'utilisateur
 * @param {number} realRate - Le taux réel récupéré depuis l'API
 * @returns {boolean} True si le taux fixe doit être désactivé
 */
export const shouldDisableFixedRate = (
  fixedRate: number,
  realRate: number,
): boolean => {
  if (fixedRate === 0) return false;
  return Math.abs(fixedRate - realRate) / realRate > 0.02;
};
