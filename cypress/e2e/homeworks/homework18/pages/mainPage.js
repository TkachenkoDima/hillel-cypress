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

      //Login form
      emailInput: () => cy.get('#signinEmail'),
      passwordInput: () => cy.get('#signinPassword'),
      loginButton: () => cy.get('button[class="btn btn-primary"]'),
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
        this.elements.emailInput().type(email);
        this.elements.passwordInput().type(password);
        this.elements.loginButton().click();
        cy.get('div[class="alert alert-success"]').should('be.visible');
    }
  }
  
  export default new MainPage();
  