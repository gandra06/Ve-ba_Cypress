import { invoke } from "cypress/types/lodash"

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
    
describe('Time', () => {
   
 before(() => {
 cy.visit('/')
 //cy.loginForm()
 //cy.interceptLogin()
 Cypress.Cookies.preserveOnce('_orangehrm', 'i2n99vbi7v0ktcoa28iup53d17')
 cy.Time()
 cy.url().should('include', '/viewEmployeeTimesheet')
 cy.saveLocalStorage();
 })

 beforeEach(() => {
    //Cypress.Cookies.preserveOnce('_orangehrm', '7gkfnjjclo9ln7iqb15urgbpca')
  cy.restoreLocalStorage();
 })

 it('Test Punch In/Out' , () => {

    cy.contains('Attendance').click()
    cy.get('.oxd-date-input').find('input').eq(0).click()
    cy.get('.oxd-calendar-wrapper').should('exist')
    cy.get('.oxd-calendar-wrapper').find('li').contains('December').should('be.visible')
    cy.get('.oxd-calendar-wrapper').find('li').contains('2022').should('be.visible')
    cy.get('.oxd-calendar-wrapper').find('button').eq(1).click()
    cy.get('.oxd-calendar-wrapper').find('li').then(($calendar) => { 
        if($calendar.text().includes('February')) { 

        } 
        else {
            cy.get('.oxd-calendar-wrapper').find('button').eq(1).click()
            cy.get('.oxd-calendar-wrapper')
            .find('li')
            .then(($calendar) => { 
                if($calendar.text().includes('February')) {
                    cy.log('February is selected')
                }
            }) 
        } 
    })
    cy.get('.oxd-calendar-dates-grid').contains('23').click()
    cy.get('.oxd-calendar-wrapper').should('not.exist')
    
    cy.contains('.oxd-dropdown-menu' , ('Punch In/Out')).click()
    
    cy.contains('.oxd-input-group', 'Date')//.should('have.text' , 'Date')//.first()
    
    .find('input').click({force:true})
    

     
//cy.get('.oxd-calendar-selector-year-selected > .oxd-icon').click()
                 // cy.contains('2022').click()
                  //cy.get('.oxd-calendar-selector-month-selected > .oxd-icon').click()  
                  //cy.contains('November').click()
                  //cy.get(':nth-child(21) > .oxd-calendar-date').click()
 }) 

})