import basePage from "../pages/basePage";
import mainPage from "../pages/mainPage";
import guestPage from "../pages/guestPage";

describe("Hillel Auto Simple Tests", () => {
  beforeEach(() => {
    basePage.visit();
  });

  it("verify main page", () => {
    mainPage.elements.logo().should("be.visible");
    mainPage.elements.footerSection().should("be.visible");
  });

  it("login as guest", () => {
    mainPage.clickGuestLogin();
    guestPage.getHeaderBarText()
      .should("equal", "Logged in as guest, any changes will be lost!");
  });

  it("logout as guest", () => {
    mainPage.clickGuestLogin();
    guestPage.logoutFromProfile();
    mainPage.elements.signInButton().should("be.visible");
  });

  it("verify social buttons", () => {
    mainPage.elements.facebookButton()
      .should("be.visible")
      .parent() 
      .should("have.attr", "href", "https://www.facebook.com/Hillel.IT.School");
  
    mainPage.elements.telegramButton()
      .should("be.visible")
      .parent() 
      .should("have.attr", "href", "https://t.me/ithillel_kyiv");

    mainPage.elements.youtubeButton()
      .should("be.visible")
      .parent() 
      .should("have.attr", "href", "https://www.youtube.com/user/HillelITSchool?sub_confirmation=1");
  
    mainPage.elements.instagramButton()
      .should("be.visible")
      .parent()
      .should("have.attr", "href", "https://www.instagram.com/hillel_itschool/");

    mainPage.elements.linkedinButton()
      .should("be.visible")
      .parent() 
      .should("have.attr", "href", "https://www.linkedin.com/school/ithillel/");
  });
});
