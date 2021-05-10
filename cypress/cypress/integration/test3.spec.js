describe('Third case', () => {
    it('Validate title on Spanish version', () => {
      cy.visit('/');
      cy.get("a[href*='es.itmo']")
        .should('have.attr', 'href').and('include', 'es')
        .then((href) => {
            cy.visit(href)
        });
      cy.get('title').should('have.text', 'ITMO University');
    })
  })