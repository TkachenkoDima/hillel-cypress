import basePage from "../pages/basePage";
import mainPage from "../pages/mainPage";
import garagePage from "../pages/garagePage";
import addEditCarModal from "../pages/addEditCarModal";
import User from "../models/UserModel";
import generators from "../utils/generators";

describe("Hillel Auto Add Cars Tests", () => {
  let existingUser;

  beforeEach(() => {
    basePage.visit();
    existingUser = new User("kek", "ololoev", "kek@ololo.ev", "123qweASD");
    mainPage.loginWithExistingUser(existingUser._email, existingUser._password);
  });

  it("Verify add new car with empty fields", () => {
    garagePage.clickAddCarButton();
    addEditCarModal.clickMilageInput();
    addEditCarModal.clickOutside();
    expect(addEditCarModal.getErrorMessage().should("have.text", "Mileage cost required"));
    addEditCarModal.clearCarMileageInput();
    addEditCarModal.fillCarMileage("-1");
    expect(addEditCarModal.getErrorMessage().should("have.text", "Mileage has to be from 0 to 999999"));
    addEditCarModal.clearCarMileageInput();
    addEditCarModal.fillCarMileage(generators.generateRandomDigits(7));
    expect(addEditCarModal.getErrorMessage().should("have.text", "Mileage has to be from 0 to 999999"));
    addEditCarModal.clickCancelAddCarButton();
  });

  it("Add car and verify add fuel expense", () => {
    garagePage.clickAddCarButton();
    addEditCarModal.selectCarBrand("BMW");
    addEditCarModal.selectCarModel("X5");
    addEditCarModal.fillCarMileage("10");
    addEditCarModal.clickSaveCarButton();

    garagePage.clickAddFuelExpenseButton();
    addEditCarModal.clickNumberOfLitersInput();
    addEditCarModal.clickOutside();
    expect(addEditCarModal.getErrorMessage().should("have.text", "Liters required"));
    addEditCarModal.fillNumberOfLitersInput("0");
    expect(addEditCarModal.getErrorMessage().should("have.text", "Liters has to be from 0.01 to 9999"));
    addEditCarModal.clearNumberOfLitersInput();
    addEditCarModal.fillNumberOfLitersInput("10");

    addEditCarModal.clickTotalCostInput();
    addEditCarModal.clickOutside();
    expect(addEditCarModal.getErrorMessage().should("have.text", "Total cost required"));
    
    addEditCarModal.fillTotalCostInput("-1");
    addEditCarModal.clickOutside();
    expect(addEditCarModal.getErrorMessage().should("have.text", "Total cost has to be from 0.01 to 1000000"));
    addEditCarModal.clearTotalCostInput();
    addEditCarModal.fillTotalCostInput("10");
    addEditCarModal.clickSaveCarButton();
    expect(addEditCarModal.getAlertErrorMessage().should( "have.text", "First expense mileage must not be less or equal to car initial mileage. Car initial mileage is 10"));

    addEditCarModal.fillEditCarMileage("20");
    addEditCarModal.clickSaveCarButton();
  });

  after(() => {
    cy.get('a[routerlink="garage"]').click();
    garagePage.removeAllCars();
  });
});
