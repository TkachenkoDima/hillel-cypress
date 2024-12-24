class BasePage {
    visit() {
      cy.visit('https://qauto.forstudy.space', {
        auth: {
          username: 'guest',
          password: 'welcome2qauto'
        }
      });
    }
  }
  
  export default new BasePage();
  