describe("Currency Converter", () => {
    it("affiche le bon titre", () => {
      cy.visit("/");
      cy.contains("Convertisseur Euro-Dollar").should("be.visible");
    });
  });
  