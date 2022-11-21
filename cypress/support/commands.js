import {login} from '../../cypress/support/POM/Login.cy'




Cypress.Commands.add("Login", ()=>{
    cy.visit('/')
    cy.get('h5').contains('Login').should('be.visible')
    cy.get(login.username).type('admin')
    cy.get(login.password).type('Admin1234.')
    cy.get(login.login).contains('Login').click()
    cy.url().should('include', '/dashboard/index')

})