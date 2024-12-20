describe('HerokuApp Tests', () => {
    beforeEach(() => {
        cy.visit( '/');
    });

    it('Verify A/B Testing page', () => {
        cy.contains('A/B Testing').click();
        cy.url().should('include', 'abtest');
        cy.get('h3').should('contain', 'A/B Test');
    });

    it('Verify add/delete elements', () => {
        cy.contains('Add/Remove Elements').click();
        cy.url().should('include', 'add_remove_elements/');
        cy.contains('Add Element').click();
        cy.get('.added-manually').should('have.length', 1);
        cy.contains('Delete').click();
    });

    it('Verify checkboxes', () => {
        cy.contains('Checkboxes').click();
        cy.url().should('include', 'checkboxes');
        cy.get('input[type="checkbox"]').first().check().should('be.checked');
        cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked');
    });

    it('Verify dropdown', () => {
        cy.contains('Dropdown').click();
        cy.url().should('include', 'dropdown');
        cy.get('#dropdown').select('Option 1').should('have.value', '1');
    });
});