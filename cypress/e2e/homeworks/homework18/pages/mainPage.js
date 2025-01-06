class MainPage {
    elements = {
      signInButton: () => cy.get('button.header_signin'),
      signUpButton: () => cy.get('button[class*="btn-primary"]'),
      guestLoginButton: () => cy.get('button[class$="-guest"]'),
      logo: () => cy.get('.header_logo'),

      //Login form
      emailInput: () => cy.get('input[type="email"]'),
      passwordInput: () => cy.get('input[type="password"]'),
      loginButton: () => cy.get('.btn-primary'),

      //Social buttons
      footerSection: () => cy.get('.footer'),
      facebookButton: () => cy.get('span[class$="icon-facebook"]'),
      telegramButton: () => cy.get('span[class$="icon-telegram"]'),
      youtubeButton: () => cy.get('span[class$="icon-youtube"]'),
      instagramButton: () => cy.get('span[class$="icon-instagram"]'),
      linkedinButton: () => cy.get('span[class$="icon-linkedin"]'),
    };
  
    clickSignIn() {
      this.elements.signInButton().click();
    }
  
    clickSignUp() {
      this.elements.signUpButton().click();
    }
  
    clickGuestLogin() {
      this.elements.guestLoginButton().click();
    }
  
    clickFacebookSocial() {
      this.elements.facebookButton().click();
    }

    clickSignUpButton() {
        this.elements.signUpButton().click();
    }

    loginWithExistingUser(email, password) {
        this.clickSignIn();
        cy.get('input[type="email"]').type(email);
        cy.get('input[type="password"]').type(password);
        cy.get('.btn-primary').click();
    }
  }
  
  export default new MainPage();
  