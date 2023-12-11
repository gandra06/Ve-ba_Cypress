/// <reference types="Cypress" />
import { sidebar } from '../../../support/POM/sidebar.cy.js'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
describe('Create system user', () => {
    it('adds new user', () => {
        const user = 'User1'
        cy.intercept('GET', '/orangehrm/web/index.php/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC').as('adminUser')
        //cy.intercept('GET', 'http://localhost/orangehrm/web/index.php/api/v2/time/employees/timesheets/list?limit=50&offset=0').as('timeAtWork')
        cy.Login()
        cy.get(sidebar.sidebarview,).find('a').contains('Admin').click()
        cy.wait('@adminUser')
        //cy.wait('@timeAtWork')
        cy.get('button', { timeout: 10000 }).contains('Add').click()
        cy.get('h6').contains('Add User').should('exist').and('be.visible')
        cy.get('label').contains('User Role').should('be.visible')
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input').click()
        cy.get('.oxd-select-dropdown').contains('ESS').click()
        cy.get('label').contains('Employee Name').should('be.visible')
        cy.get('.oxd-autocomplete-text-input > input').type('Lana')
        cy.get('.oxd-input-group > .oxd-text').should('not.exist')
        cy.get('.oxd-autocomplete-wrapper').should('be.visible')
        cy.get('.oxd-autocomplete-wrapper').contains('Lana Kostic').click()
        cy.get('label').contains('Status').should('be.visible')
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.get('.oxd-select-dropdown').contains('Enabled').click()
        cy.get('label').contains('Username').should('be.visible')
        cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type(user)
        cy.get('label').contains('Password').should('be.visible')
        cy.get('.user-password-cell').type('User1234.')
        cy.get('.oxd-chip').should('be.visible').should('have.css', 'background-color', 'rgb(147, 180, 15)')
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('User1234.')
        cy.get('.oxd-button--ghost').contains('Cancel').should('be.enabled')
        cy.get('.oxd-button--secondary').contains('Save').should('be.enabled').click()
        cy.get('.orangehrm-container',{timeout:10000}).contains(user).should('be.visible')
        
    })
    it('Delete user', () => {
        //cy.get('.oxd-table-row') .contains('User1')
        //.then($elements => {cy.wrap($elements[6]).click()
        //})
        cy.contains('User1')  
         .parents('.oxd-table-row')
         .find('button').first()
         .click()
            //cy.on('window:confirm', (str) =>
        //{
            //expect(str).to.equal('Are you Sure?')
        //})

        cy.get('.oxd-button--label-danger').contains('Yes, Delete').click()
         //cy.get('.orangehrm-modal-footer',{timeout:10000}).contans('Yes, Delete').click()

        //cy.get(':nth-child('User1')) > .oxd-table-row > :nth-child(5) > .oxd-table-cell-actions > :nth-child(1) > .oxd-icon').click()
        //cy.get('.oxd-button--label-danger').click()
        //cy.intercept('DELETE', '/localhost/orangehrm/web/index.php/api/v2/admin/users').as('deleteUser')
        cy.contains('admin').should('be.visible')
        cy.contains('User1').should('not.be.visible')
        
        
        //cy.wait('@deleteUser')
    })
})