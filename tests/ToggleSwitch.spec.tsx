import { render, screen, fireEvent } from "@testing-library/react";
import ToggleSwitch from "../src/components/molecules/ToggleSwitch";
import React from "react";
import { describe, expect, test, vi } from "vitest";

describe("ToggleSwitch", () => {
  test("affiche un switch correctement", () => {
    render(<ToggleSwitch checked={false} onChange={() => {}} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  test("change d'état lorsqu'on clique dessus", () => {
    const handleChange = vi.fn();
    render(<ToggleSwitch checked={false} onChange={handleChange} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("le switch est bien activé lorsque checked est true", () => {
    render(<ToggleSwitch checked={true} onChange={() => {}} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  test("le switch est bien désactivé lorsque checked est false", () => {
    render(<ToggleSwitch checked={false} onChange={() => {}} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });
});
