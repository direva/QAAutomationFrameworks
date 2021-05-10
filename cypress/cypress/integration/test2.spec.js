describe('Second case', () => {
    it('Validate algorithm of magister program admission', () => {
      cy.visit('/');
      cy.get('li.dropdown').contains('Абитуриентам').click();
      cy.get("li.dropdown a[href*='master']")
        .should('have.attr', 'href').and('include', 'master')
        .then((href) => {
            cy.visit(href)
        });
      const stepsCount = cy.get('section.incoming-steps .caption span').length;
      const expectedSteps = ['Знакомлюсь', 'Выбираю', 'Подаю', 'Сдаю', 'Обучаюсь', 'Работаю'];
      for(let i = 0; i < stepsCount; i++) {
          cy.get('section.incoming-steps .caption span')
            .eq(i)
            .should('have.text', expectedSteps[i])
      }
    })
  })