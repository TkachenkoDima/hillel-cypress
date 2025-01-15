import basePage from "../pages/basePage";
import mainPage from "../pages/mainPage";

describe("Intercept Profile Page", () => {
  it('Changes user name to "Polar Bear" via intercepting request', () => {
    const profileBody = {
      status: "ok",
      data: {
        "userId":168015,
        "photoFilename":"user-1736948014110.jpg",
        "name":"Polar",
        "lastName":"Bear"
      },
    };

    basePage.visit();

    cy.intercept('**/profile', profileBody);
    mainPage.loginWithExistingUser('kek@ololo.ev', '123qweASD');
    cy.get('a[routerlink="profile"]').click();
    cy.get('p[class*="profile_name"]').should("have.text", "Polar Bear");
  });
});
