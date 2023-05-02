describe('Login', () => {
  beforeEach(() => {

    cy.visit('http://localhost:3000/')

  })
  it('if logged in can see logout btn', () => {
    const email = 'test1@gmail.com'
    const password = '123456'

    
    cy.get('[data-cy="email"]').type(`${email}{enter}`)
    cy.get('[data-cy="password"]').type(`${password}{enter}`)

    cy.get('[data-cy="signIn"]').click()

    cy.get('[data-cy="logoutBtn"]')
      .contains('logout')
  })


})

describe('Select mobile', () => {

  it('Selecting user shows chat hides sidebar ', () => {
    const email = 'test1@gmail.com'
    const password = '123456'

    
    cy.viewport(450, 750).get('[data-cy="email"]').type(`${email}{enter}`)
    cy.viewport(450, 750).get('[data-cy="password"]').type(`${password}{enter}`)

    cy.viewport(450, 750).get('[data-cy="signIn"]').click()

    cy.viewport(450, 750).get('[data-cy="logoutBtn"]')
      .contains('logout')
  })


})
