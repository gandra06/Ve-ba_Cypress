import { sidebar } from '../../support/POM/sidebar.cy'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
describe('Create system user', () => {
    it('adds new user', () => {
        const user = 'admin2'
        cy.intercept('GET', '/orangehrm/web/index.php/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC').as('adminUser')
        cy.Login()
        cy.get(sidebar.sidebarview,).find('a').contains('Admin').click()
        cy.wait('@adminUser')
        cy.get('button', { timeout: 10000 }).contains('Add').click()
        cy.get('h6').contains('Add User').should('exist').and('be.visible')
        cy.get('label').contains('User Role').should('be.visible')
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input').click()
        cy.get('.oxd-select-dropdown').contains('Admin').click()
        cy.get('label').contains('Employee Name').should('be.visible')
        cy.get('.oxd-autocomplete-text-input > input').type('Zeljko')
        cy.get('.oxd-input-group > .oxd-text').should('not.exist')
        cy.get('.oxd-autocomplete-wrapper').should('be.visible')
        cy.get('.oxd-autocomplete-wrapper').contains('Zeljko Mandic').click()
        cy.get('label').contains('Status').should('be.visible')
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.get('.oxd-select-dropdown').contains('Enabled').click()
        cy.get('label').contains('Username').should('be.visible')
        cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type(user)
        cy.get('label').contains('Password').should('be.visible')
        cy.get('.user-password-cell').type('Admin1234.')
        cy.get('.oxd-chip').should('be.visible').should('have.css', 'background-color', 'rgb(147, 180, 15)')
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin1234.')
        cy.get('.oxd-button--ghost').contains('Cancel').should('be.enabled')
        cy.get('.oxd-button--secondary').contains('Save').should('be.enabled').click()
        cy.get('orangehrm-container',{timeout:10000}).contains('admin2').should('be.visible')
    })
})