/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
describe('OrangeHRM My Info page', () => {
    beforeEach(() => {
      // Login to the application
      cy.visit('https://orangehrm-demo-6x.orangehrmlive.com/')
      cy.get('#txtUsername').type('admin')
      cy.get('#txtPassword').type('admin123')
      cy.get('#btnLogin').click()
  
      // Navigate to My Info page
      cy.contains('My Info').click()
    })
  
    it('should select a date in License Expiry Date datepicker', () => {
      // Click on the License Expiry Date field
      cy.get('#emp_license_expiry_date').click()
  
      // Click on the year dropdown and select a year
      cy.get('.ui-datepicker-year').click()
      cy.get('.ui-datepicker-year').contains('2024').click()
  
      // Click on the month dropdown and select a month
      cy.get('.ui-datepicker-month').click()
      cy.get('.ui-datepicker-month').contains('May').click()
  
      // Click on a date
      cy.get('.ui-datepicker-calendar').contains('15').click()
  
      // Verify that the selected date is displayed in the License Expiry Date field
      cy.get('#emp_license_expiry_date').should('have.value', '05/15/2024')
    })
  })