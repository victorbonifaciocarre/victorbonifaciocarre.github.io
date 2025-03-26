import React, { useState, useEffect } from "react";
import ToggleSwitch from "../molecules/ToggleSwitch";
import Input from "../atoms/Input";
import ExchangeRateInput from "../molecules/ExchangeRateInput";
import ConversionHistory from "./ConversionHistory";
import {
  fetchExchangeRate,
  shouldDisableFixedRate,
} from "../../services/exchangeRateService";

interface Conversion {
  amount: string;
  convertedAmount: string;
  rate: number;
  realRate: number;
  from: string;
  to: string;
}

/**
 * Composant principal du convertisseur de devises
 * Permet la conversion entre l'Euro et le Dollar avec gestion des taux dynamiques et fixes.
 */
const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [isReversed, setIsReversed] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(1.1);
  const [fixedRate, setFixedRate] = useState<number>(exchangeRate);
  const [history, setHistory] = useState<Conversion[] | undefined>();
  const [isFixed, setIsFixed] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isOverwritten, setIsOverwritten] = useState(false);

  /**
   * Met à jour le taux de change toutes les 3 secondes
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setExchangeRate((prevRate) => {
        const variation = Math.random() * 0.1 - 0.05;
        return parseFloat((prevRate + variation).toFixed(3));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchRate = async () => {
      const rate = fetchExchangeRate();
      setExchangeRate(rate);
    };
    fetchRate();
  }, []);

  /**
   * Calcule le montant converti à chaque changement de montant ou de taux
   */
  useEffect(() => {
    if (amount !== "") {
      const rateToUse = isFixed ? fixedRate : exchangeRate;
      setConvertedAmount(
        isReversed
          ? (parseFloat(amount) / rateToUse).toFixed(3)
          : (parseFloat(amount) * rateToUse).toFixed(3),
      );
    } else {
      setConvertedAmount("");
    }
  }, [amount, exchangeRate, fixedRate, isReversed, isFixed]);

  /**
   * Gère la modification du montant
   */
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  /**
   * Inverse la conversion EUR/USD
   */
  const handleToggle = () => {
    setIsReversed(!isReversed);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  /**
   * Modifie le taux de change fixe
   */
  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFixedRate(parseFloat(e.target.value));
    setIsFixed(true);
  };

  /**
   * Vérifie la variation entre la valeur fixée et le taux actuel
   * Ecrase la valeur si la variation nax est atteinte
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isFixed && shouldDisableFixedRate(fixedRate, exchangeRate)) {
        console.log("Fixed rate overwritten");
        setFixedRate(exchangeRate);
        setIsFixed(false);
        setIsOverwritten(true);
        setTimeout(() => setIsOverwritten(false), 1000);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [exchangeRate, fixedRate, isFixed]);

  /**
   * Met à jour du style du champ du taux
   */
  useEffect(() => {
    if (!isFixed) {
      setIsUpdated(true);
      const timeoutId = setTimeout(() => setIsUpdated(false), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [exchangeRate, isFixed]);

  /**
   * Ajoute une conversion à l'historique
   */
  const handleConvert = () => {
    if (amount !== "") {
      const conversionData: Conversion = {
        amount,
        convertedAmount,
        realRate: exchangeRate,
        rate: isFixed ? fixedRate : exchangeRate,
        from: isReversed ? "USD" : "EUR",
        to: isReversed ? "EUR" : "USD",
      };
      setHistory((prevHistory: Conversion[] | undefined) => [
        conversionData,
        ...(prevHistory ?? []).slice(0, 4),
      ]);
    }
  };

  return (
    <div className="currency-converter">
      <div className="converter">
        <h2>Convertisseur Euro-Dollar</h2>
        <ExchangeRateInput
          value={isFixed ? fixedRate : exchangeRate}
          onChange={handleRateChange}
          isFixed={isFixed}
          isUpdated={isUpdated}
          isOverwritten={isOverwritten}
        />
        <div className="input-container">
          <div className="currency-field">
            <Input
              value={isReversed ? convertedAmount : amount}
              onChange={handleAmountChange}
              placeholder="Saisir une valeur en EUR"
              disabled={isReversed}
              devise="EUR"
            />
          </div>
          <div className="toggle-switch-container">
            <ToggleSwitch checked={isReversed} onChange={handleToggle} />
          </div>
          <div className="currency-field">
            <Input
              value={isReversed ? amount : convertedAmount}
              onChange={handleAmountChange}
              placeholder="Saisir une valeur en USD"
              disabled={!isReversed}
              devise="USD"
            />
          </div>
        </div>
      </div>
      <button className="convert-button" onClick={handleConvert}>
        Convertir
      </button>
      <ConversionHistory history={history} />
    </div>
  );
};

export default CurrencyConverter;
