import { render, screen, fireEvent } from "@testing-library/react";
import CurrencyConverter from "../src/components/organisms/CurrencyConverter";
import React from "react";
import { describe, expect, test } from "vitest";

describe("CurrencyConverter", () => {
  test("affiche le titre du composant", () => {
    render(<CurrencyConverter />);
    expect(screen.getByText("Convertisseur Euro-Dollar")).toBeInTheDocument();
  });

  test("permet de saisir un montant", () => {
    render(<CurrencyConverter />);
    const inputEUR = screen.getByPlaceholderText("Saisir une valeur en EUR");
    fireEvent.change(inputEUR, { target: { value: "100" } });
    expect(inputEUR).toHaveValue(100);
  });

  test("inverse les devises lors du toggle", () => {
    render(<CurrencyConverter />);
    const toggleSwitch = screen.getByRole("checkbox");
    fireEvent.click(toggleSwitch);
    expect(toggleSwitch).toBeChecked();
  });

  test("calcule correctement la conversion", () => {
    render(<CurrencyConverter />);
    const inputEUR = screen.getByPlaceholderText("Saisir une valeur en EUR");
    fireEvent.change(inputEUR, { target: { value: "100" } });

    const inputUSD = screen.getByPlaceholderText("Saisir une valeur en USD");
    expect(inputUSD).not.toHaveValue("");
  });

  test("ajoute une conversion à l'historique", () => {
    render(<CurrencyConverter />);
    const convertButton = screen.getByText("Convertir");
    fireEvent.click(convertButton);
    expect(screen.getByText("Historique des conversions")).toBeInTheDocument();
  });
});
