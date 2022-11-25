import { login } from '../../cypress/support/POM/Login.cy'




Cypress.Commands.add("Login", () => {
  cy.clearCookies()
  cy.getCookies().should('be.empty')
  cy.visit('/')
  onBeforeLoad: (win) => {
    win.sessionStorage.clear()
  }
  cy.intercept('GET', ' http://localhost/orangehrm/web/index.php/core/i18n/messages', (req) => {
    delete req.headers['if-none-match'];
  }).as('message')
  cy.intercept('GET', '/orangehrm/web/index.php/api/v2/dashboard/employees/action-summary').as('employees')
  cy.intercept('GET', '/orangehrm/web/index.php/api/v2/dashboard/shortcuts').as('shortcuts')
  cy.intercept('GET', ' /orangehrm/web/index.php/api/v2/dashboard/employees/leaves?date=2022-11-23').as('leaves')
  cy.intercept('GET', '/orangehrm/web/index.php/api/v2/dashboard/employees/subunit').as('subunit')
  cy.intercept('GET', '/orangehrm/web/index.php/api/v2/dashboard/employees/locations').as('location')
  cy.get(login.username).type('admin')
  cy.get(login.password).type('Admin1234.')
  cy.get(login.login).contains('Login').click()
  cy.wait('@message').then((interception) => {
    console.log('Intercepted:', interception);
  })
  cy.wait('@employees')
  cy.wait('@shortcuts')
 // cy.wait('@leaves')
  cy.wait('@subunit')
  cy.wait('@location')
  cy.url().should('include', '/dashboard/index')
})