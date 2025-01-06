import basePage from '../pages/basePage';
import mainPage from '../pages/mainPage';
import registrationModal from '../pages/registrationModal';
import generators from '../utils/generators';
import User from '../models/UserModel';

describe('Hillel Auto Registration Tests', () => {
  let existingUser;
  let newUser;

  beforeEach(() => {
    basePage.visit();
    mainPage.clickSignUpButton();
    existingUser = new User('kek', 'ololoev', 'kek@ololo.ev', '123qweASD');
    newUser = User.createNewUser();
  });

  it('Create user for preconditions', () => {
    const password = generators.generatePassword()

    newUser.password = password;
    newUser.repeatPassword = password;

    newUser.create().then((response) => {
      expect(response.status).to.eq(201);
      cy.log('New user created successfully!');
    });
  });

  //Name tests
  it('Verify name field empty state', () => {
    registrationModal.clickNameInput();
    registrationModal.clickOutside();
    registrationModal.getNameInputErrorText().should('have.text', 'Name required');
  });

  it('Verify name field length', () => {
    registrationModal.clickNameInput();
    registrationModal.fillNameInput(generators.generateRandomString(1));
    registrationModal.clickOutside();
    registrationModal.getNameInputErrorText().should('have.text', 'Name has to be from 2 to 20 characters long');
    registrationModal.fillNameInput(generators.generateRandomString(21));
    registrationModal.getNameInputErrorText().should('have.text', 'Name has to be from 2 to 20 characters long');
  });

  it('Verify name field special characters', () => {
    registrationModal.clickNameInput();
    registrationModal.fillNameInput(generators.generateRandomString(5) + '@');
    registrationModal.clickOutside();
    registrationModal.getNameInputErrorText().should('have.text', 'Name is invalid');
  });

  it('Verify red border on name field while error', () => {
    registrationModal.clickNameInput();
    registrationModal.fillNameInput(generators.generateRandomString(1));
    registrationModal.clickOutside();
    registrationModal.getNameInputErrorText().should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });

  //Last name tests
  it('Verify last name field empty state', () => {
    registrationModal.fillNameInput(generators.generateRandomString(5));
    registrationModal.clickLastNameInput();
    registrationModal.clickOutside();
    registrationModal.getLastNameInputErrorText().should('have.text', 'Last name required');
  });

  it('Verify last name field length', () => {
    registrationModal.fillNameInput(generators.generateRandomString(5));
    registrationModal.clickLastNameInput();
    registrationModal.fillLastNameInput(generators.generateRandomString(1));
    registrationModal.clickOutside();
    registrationModal.getLastNameInputErrorText().should('have.text', 'Last name has to be from 2 to 20 characters long');
    registrationModal.fillLastNameInput(generators.generateRandomString(21));
    registrationModal.getLastNameInputErrorText().should('have.text', 'Last name has to be from 2 to 20 characters long');
  });

  it('Verify last name field special characters', () => {
    registrationModal.fillNameInput(generators.generateRandomString(5));
    registrationModal.clickLastNameInput();
    registrationModal.fillLastNameInput(generators.generateRandomString(5) + '@');
    registrationModal.clickOutside();
    registrationModal.getLastNameInputErrorText().should('have.text', 'Last name is invalid');
  });

  it('Verify red border on last name field while error', () => {
    registrationModal.fillNameInput(generators.generateRandomString(5));
    registrationModal.clickLastNameInput();
    registrationModal.fillLastNameInput(generators.generateRandomString(1));
    registrationModal.clickOutside();
    registrationModal.getLastNameInputErrorText().should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });

  //Email tests
  it('Verify email field empty state', () => {
    registrationModal.clickEmailInput();
    registrationModal.clickOutside();
    registrationModal.getEmailInputErrorText().should('have.text', 'Email required');
  });

  it('Verify email field invalid email format', () => {
    registrationModal.clickEmailInput();
    registrationModal.fillEmailInput(generators.generateRandomString(5) + '@');
    registrationModal.clickOutside();
    registrationModal.getEmailInputErrorText().should('have.text', 'Email is incorrect');
  });

  it('Verify red border on email field while error', () => {
    registrationModal.clickEmailInput();
    registrationModal.fillEmailInput(generators.generateRandomString(5) + '@');
    registrationModal.clickOutside();
    registrationModal.getEmailInputErrorText().should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });

  it('Verify password fields empty state', () => {
    registrationModal.fillNameInput(newUser.name);
    registrationModal.fillLastNameInput(newUser.lastName);
    registrationModal.fillEmailInput(newUser.email);
    registrationModal.clickPasswordInput();
    registrationModal.clickOutside();
    registrationModal.getPasswordInputErrorText().should('have.text', 'Password required');
    registrationModal.clickReEnterPasswordInput();
    registrationModal.clickOutside();
    registrationModal.getReEnterPasswordInputErrorText().should('have.text', 'Re-enter password required');
  });

  it('Verify password fields length', () => {
    registrationModal.fillNameInput(newUser.name);
    registrationModal.fillLastNameInput(newUser.lastName);
    registrationModal.fillEmailInput(newUser.email);
    registrationModal.clearPasswordInput();
    registrationModal.clickPasswordInput();
    registrationModal.fillPasswordInput(newUser.password.slice(0, 7));
    registrationModal.clickOutside();
    registrationModal.getPasswordInputErrorText().should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    registrationModal.fillPasswordInput(generators.generateRandomString(16));
    registrationModal.getPasswordInputErrorText().should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
  });

  it('Verify reEnter password field does not match password field', () => {
    registrationModal.fillNameInput(newUser.name);
    registrationModal.fillLastNameInput(newUser.lastName);
    registrationModal.fillEmailInput(newUser.email);
    registrationModal.fillPasswordInput(newUser.password);
    registrationModal.fillReEnterPasswordInput(newUser.password.slice(0, newUser.password.length - 1));
    registrationModal.clickOutside();
    registrationModal.getReEnterPasswordInputErrorText().should('have.text', 'Passwords do not match');
  });

  it('Verify red border on password fields while error', () => {
    registrationModal.fillNameInput(newUser.name);
    registrationModal.fillLastNameInput(newUser.lastName);
    registrationModal.fillEmailInput(newUser.email);
    registrationModal.clearPasswordInput();
    registrationModal.clickPasswordInput();
    registrationModal.fillPasswordInput(newUser.password.slice(0, 7));
    registrationModal.clickOutside();
    registrationModal.getPasswordInputErrorText().should('have.css', 'border-color', 'rgb(220, 53, 69)');
    registrationModal.clickReEnterPasswordInput();
    registrationModal.fillReEnterPasswordInput(newUser.password.slice(0, newUser.password.length - 1));
    registrationModal.clickOutside();
    registrationModal.getReEnterPasswordInputErrorText().should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });

  it('Verify existing email', () => {
    registrationModal.fillNameInput(existingUser.name);
    registrationModal.fillLastNameInput(existingUser.lastName);
    registrationModal.fillEmailInput(existingUser.email);
    registrationModal.fillPasswordInput(existingUser.password);
    registrationModal.fillReEnterPasswordInput(existingUser.repeatPassword);
    registrationModal.clickRegisterButton();
    registrationModal.getAlertDangerMessageText().should('have.text', 'User already exists');
  });
});
