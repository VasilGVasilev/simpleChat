describe('Mobile layout', () => {
    beforeEach(() => {
  
        cy.viewport(449, 750).visit('http://localhost:3000/')
  
    })
    it('logged in succesfully', () => {
      const email = 'test1@gmail.com'
      const password = '123456'
  
      
      cy.viewport(449, 750).get('[data-cy="email"]').type(`${email}{enter}`)
      cy.viewport(449, 750).get('[data-cy="password"]').type(`${password}{enter}`)
  
      cy.viewport(449, 750).get('[data-cy="signIn"]').click()

      cy.viewport(449, 750).get('[data-cy="sidebar"]').first().should('have.class', 'sidebarShow')
      cy.viewport(449, 750).get('[data-cy="chat"]').should('have.class', 'chatHidden')


      cy.viewport(440, 750).get('[class="userChat"]').first().click()
      cy.viewport(449, 750).get('[data-cy="sidebar"]').should('have.class', 'sidebarHidden')
      cy.viewport(449, 750).get('[data-cy="chat"]').should('have.class', 'chatShow')


      cy.viewport(449, 750).get('[data-cy="backToSidebar"]').click()

      cy.viewport(449, 750).get('[data-cy="sidebar"]').should('have.class', 'sidebarShow')
      cy.viewport(449, 750).get('[data-cy="chat"]').should('have.class', 'chatHidden')


    })
    
      
  })
  
  

  