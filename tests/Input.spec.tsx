import * as matchers from "@testing-library/jest-dom/matchers";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import Input from "../src/components/atoms/Input";

expect.extend(matchers);

test("L'input doit afficher la valeur fournie et déclencher onChange", async () => {
  const mockOnChange = vi.fn();
  render(<Input value={"10"} onChange={mockOnChange} devise="EUR" />);

  const input = screen.getByRole("spinbutton");
  expect(input).toHaveValue(10);

  await userEvent.type(input, "20");
  expect(mockOnChange).toHaveBeenCalled();
});
