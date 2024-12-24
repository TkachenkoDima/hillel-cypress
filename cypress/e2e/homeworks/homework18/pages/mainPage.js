class MainPage {
    elements = {
      signInButton: () => cy.get('button.header_signin'),
      signUpButton: () => cy.get('button[class*="btn-primary"]'),
      guestLoginButton: () => cy.get('button[class$="-guest"]'),
      logo: () => cy.get('.header_logo'),
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
  }
  
  export default new MainPage();
  