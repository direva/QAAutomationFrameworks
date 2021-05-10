describe('First case', () => {
    it('Open site and make screenshot', () => {
      cy.visit('/');
      cy.screenshot();
    })
  })