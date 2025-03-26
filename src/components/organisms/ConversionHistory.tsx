import React from "react";

interface Conversion {
  amount: string;
  convertedAmount: string;
  realRate: number;
  rate: number;
  from: string;
  to: string;
}

interface ConversionHistoryProps {
  history: Conversion[] | undefined;
}

/**
 * Composant affichant l'historique des conversions
 * @param {Conversion[]} history - Liste des 5 dernières conversions
 */
const ConversionHistory: React.FC<ConversionHistoryProps> = ({ history }) => {
  return (
    <div className="conversions-history">
      <h3>Historique des conversions</h3>
      <table>
        <thead>
          <tr>
            <th>Montant</th>
            <th>Converti</th>
            <th>Taux réel</th>
            <th>Taux saisi</th>
            <th>De</th>
            <th>Vers</th>
          </tr>
        </thead>
        <tbody>
          {(history ?? []).map((entry, index) => (
            <tr key={index}>
              <td>{entry.amount}</td>
              <td>{entry.convertedAmount}</td>
              <td>{entry.realRate}</td>
              <td>{entry.rate}</td>
              <td>{entry.from}</td>
              <td>{entry.to}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConversionHistory;
