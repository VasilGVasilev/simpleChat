describe('Searching for user', () => {
    beforeEach(() => {
  
        cy.visit('http://localhost:3000/')
  
    })
    it('search user successful', () => {
      const email = 'test1@gmail.com'
      const password = '123456'
      const displayName = 'test2'
      
      cy.get('[data-cy="email"]').type(`${email}{enter}`)
      cy.get('[data-cy="password"]').type(`${password}{enter}`)
  
      cy.get('[data-cy="signIn"]').click()

      cy.get('[data-cy="searchBtn"]').type(`${displayName}{enter}`)
      cy.get('[data-cy="searchedDisplayName"]').should('have.text', displayName)


    })
    
      
  })
  
  

  