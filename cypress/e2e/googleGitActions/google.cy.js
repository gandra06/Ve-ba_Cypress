/// < reference types=Cypress />
Cypress.on('uncouth:exeption', (err, runnable) => {
    return false
})
describe('login to google', () => {
   it('login scenario', () => {
    cy.visit('https://google.com/')
    cy.contains('Gmail').click()
   })
})