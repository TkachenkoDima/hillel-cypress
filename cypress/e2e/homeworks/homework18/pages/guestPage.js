class GuestPage {
  elements = {
    headerBar: () => cy.get(".header_bar"),
    logoutButton: () => cy.get(".dropdown-item").contains("Logout"),
    profileButton: () => cy.get("#userNavDropdown"),
  };

  getHeaderBarText() {
    return this.elements.headerBar().invoke("text");
  }

  logoutFromProfile() {
    this.elements.profileButton().click();
    this.elements.logoutButton().click();
  }
}

export default new GuestPage();
