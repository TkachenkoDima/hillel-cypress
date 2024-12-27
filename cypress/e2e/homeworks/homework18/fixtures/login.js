Cypress.Commands.add('login', (email = 'test@test.com', password = 'Xj3s@AZ') => {
    cy.visit('https://qauto.forstudy.space/')
    cy.get('button.btn-outline-white').click()
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('.btn-primary').click()
})
