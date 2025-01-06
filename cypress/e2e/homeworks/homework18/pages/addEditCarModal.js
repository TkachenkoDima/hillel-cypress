class AddEditCarModal {
    elements = {
        carBrandDropDown: () => cy.get('#addCarBrand'),
        carModelDropDown: () => cy.get('#addCarModel'),
        carMileageInput: () => cy.get('#addCarMileage'),
        editCarMilageInput: () => cy.get('#addExpenseMileage'),
        saveCarButton: () => cy.get('div[class*="modal-footer"] button[class*="btn-primary"]'),
        numberOfLitersInput: () => cy.get('#addExpenseLiters'),
        totalCostInput: () => cy.get('#addExpenseTotalCost'),
        errorMessage: () => cy.get('.invalid-feedback'),
        alertErrorMessage: () => cy.get('p[class*="alert-danger"]'),
    };

    clickOutside() {
        cy.get('.modal-content').click();
    }

    selectCarBrand(brand) {
        this.elements.carBrandDropDown().select(brand);
    }

    selectCarModel(model) {
        this.elements.carModelDropDown().select(model);
    }

    clickMilageInput() {
        this.elements.carMileageInput().click();
    }

    fillCarMileage(mileage) {
        this.elements.carMileageInput().type(mileage);
    }

    fillEditCarMileage(mileage) {
        this.elements.editCarMilageInput().type(mileage);
    }

    clearCarMileageInput() {
        this.elements.carMileageInput().clear();
    }

    clickSaveCarButton() {
        cy.get('div[class*="modal-footer"] button[class*="btn-primary"]').click();
    }

    clickCancelAddCarButton() {
        cy.get('div[class*="modal-footer"] button[class*="btn-secondary"]').click();
    }

    clickNumberOfLitersInput() {
        this.elements.numberOfLitersInput().click();
    }

    fillNumberOfLitersInput(liters) {
        this.elements.numberOfLitersInput().type(liters);
    }

    clearNumberOfLitersInput() {
        this.elements.numberOfLitersInput().clear();
    }

    clickTotalCostInput() {
        this.elements.totalCostInput().click();
    }

    fillTotalCostInput(cost) {
        this.elements.totalCostInput().type(cost);
    } 

    clearTotalCostInput() {
        this.elements.totalCostInput().clear();
    }

    getErrorMessage() {
        return cy.get(this.elements.errorMessage);
    }

    getAlertErrorMessage() {
        return cy.get(this.elements.alertErrorMessage);
    }
}

export default new AddEditCarModal();
