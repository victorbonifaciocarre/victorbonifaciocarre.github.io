import { expect, test } from "vitest";
import {
  fetchExchangeRate,
  shouldDisableFixedRate,
} from "../src/services/exchangeRateService";

test("should fetch exchange rate correctly", () => {
  // On pourra décommenter cette partie quand la valeur sera récupérée par appel API pour mocker la valeur récupérée
  // vi.spyOn(global, "fetch").mockResolvedValue({
  //   json: async () => ({ response: { rates: { USD: 1.2 } } }),
  // } as Response);

  const rate = fetchExchangeRate();
  expect(rate).toBe(1.1);
});

test("should disable fixed rate if variation > 2%", () => {
  expect(shouldDisableFixedRate(1.15, 1.1)).toBe(true);
  expect(shouldDisableFixedRate(1.12, 1.1)).toBe(false);
});
