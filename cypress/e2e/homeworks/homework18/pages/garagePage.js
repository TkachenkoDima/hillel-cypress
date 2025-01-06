class GaragePage {
  elements = {
    addCarButton: () => cy.get('button[class="btn btn-primary"]'),
    addFuelExpenseButton: () => cy.get('button[class^="car_add-expense"]'),
    editCarButton: () => cy.get('button[class^="car_edit"]'),
    removeCarButton: () => cy.get('button[class$="outline-danger"]'),
    confirmCarRemoveButton: () => cy.get('button[class$="btn-danger"]'),
    addedCarItem: () => cy.get('.car-list li'),
  };

  clickAddCarButton() {
    this.elements.addCarButton().click();
  }

  clickAddFuelExpenseButton() {
    this.elements.addFuelExpenseButton().first().click();
  }

  clickEditCarButton() {
    this.elements.editCarButton().click();
  }

  clickRemoveCarButton() {
    this.elements.removeCarButton().click();
  }

  clickConfirmCarRemoveButton() {
    this.elements.confirmCarRemoveButton().click();
  }

  removeAllCars() {
    this.elements.addedCarItem().each((car) => {
      cy.wrap(car).find('.icon-edit').click();
      cy.contains("Remove car").click();
      cy.get('.btn-danger').click();
    });
  }
}

export default new GaragePage();
