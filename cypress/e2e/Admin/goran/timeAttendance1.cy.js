//import { invoke } from "cypress/types/lodash"

//mport { find } from "cypress/types/lodash"

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
    
describe('Attendance', () => {
   
 before(() => {
 cy.visit('/')
 cy.loginForm()
 //cy.interceptLogin()
 //cy.saveLocalStorage();
 })

 beforeEach(() => {
    Cypress.Cookies.preserveOnce('_orangehrm', 'i2n99vbi7v0ktcoa28iup53d17')
    cy.Time()
    cy.url().should('include', '/viewEmployeeTimesheet')
    cy.restoreLocalStorage();
 })

 it('Test Punch In/Out' , () => {

    cy.contains('Attendance').click()
    cy.contains('.oxd-dropdown-menu' , 'Punch In/Out').click()
    //cy.get('.oxd-date-input').find('input').eq(0).click()
    //.then(($button) =>{
       // $button.click()
    //})
    //cy.get('.oxd-calendar-wrapper').should('exist')
    //cy.get('.oxd-calendar-wrapper')
    //.find('li').contains('December').should('be.visible').click()
    //cy.contains('.oxd-dropdown-menu').should('exist') 
    //find('February').click()
    //cy.select('February')
    cy.get('.oxd-date-input > .oxd-input')
    .invoke('show')
    .click({force:true})
    //cy.get('.oxd-date-input').find('input').click({force:true})    //date picker
            cy.get('.oxd-calendar-wrapper').should('exist').and('be.visible')
            cy.get('.oxd-calendar-header > :nth-child(1)').should('be.visible').click({force:true})
            //cy.get('.oxd-calendar-selector-year').should('be.visible').click({force:true})
            cy.get('.oxd-calendar-dropdown').children().contains('2022').click({force:true})
            cy.get('.oxd-calendar-selector-month').should('exist').and('be.visible').click({force:true})
            //cy.get('.oxd-calendar-selector-year-selected > .oxd-text')
            cy.get('.oxd-calendar-dropdown').children().contains('April').should('exist').and('be.visible').click({force:true})
            
            cy.get('.oxd-calendar-wrapper')
                    .find('li')
                    .then(($calendar) => { 
                        if($calendar.text().includes('December')) {
                            cy.log('December is selected')
                        }
                    }) 
                    cy.get('.oxd-calendar-wrapper')
                    .find('li')
                    .then(($calendar) => { 
                        if($calendar.text().includes('2022')) {
                            cy.log('2022 is selected')
                        }
                    })
            cy.get('.oxd-calendar-dates-grid').contains('23').click()


    cy.get('.oxd-input--active').should('exist').and('be.visible')
    cy.get('.oxd-date-input').find('input')//.should('have.class','active')
    .click({force:true})
            cy.get('.oxd-calendar-wrapper').should('exist')
            cy.get('.oxd-calendar-selector-month').should('be.visible').click({force:true})
            cy.get('.oxd-calendar-dropdown').children().contains('December').click({force:true})
            cy.get('.oxd-calendar-wrapper').should('exist')
            cy.get('.oxd-calendar-selector-year').should('be.visible').click({force:true})
            cy.get('.oxd-calendar-dropdown').children().contains('2022').click({force:true})
            cy.get('.oxd-calendar-wrapper').should('exist')
            cy.get('.oxd-calendar-dates-grid').contains('23').click({force:true})
            
                    cy.get('.oxd-calendar-wrapper')
                    .find('li')
                    .then(($calendar) => { 
                        if($calendar.text().includes('December')) {
                            cy.log('December is selected')
                        }
                    }) 
                    cy.get('.oxd-calendar-wrapper')
                    .find('li')
                    .then(($calendar) => { 
                        if($calendar.text().includes('2022')) {
                            cy.log('2022 is selected')
                        }
                    })
    
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