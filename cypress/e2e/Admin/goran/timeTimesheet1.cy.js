//import { sidebar } from '../../../support/POM/sidebar.cy'
import { hrmMsg } from '../../../support/POM/orangeHRMMsg.cy'
import { hrmEditButton } from '../../../support/POM/orangeHRMbtn.cy'


Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
    
describe('Time', () => {
   
 before(() => {
 cy.visit('/')
 cy.loginForm()
 //cy.interceptLogin()
 cy.Time()
 cy.url().should('include', '/viewEmployeeTimesheet')
 cy.saveLocalStorage();
 })

 beforeEach(() => {
  cy.restoreLocalStorage();
 })

 it('check employee timesheet', () => {
       
      cy.restoreLocalStorage()
    cy.get('.oxd-autocomplete-text-input > input').should('exist').and('be.visible').type('Toma')
           
            
      cy.contains('.oxd-autocomplete-option > span','Toma Nikolic')
      .should('exist').and('be.visible')
      .click()
            
      cy.contains(hrmEditButton.timeSheetBtn ,'View')
      .should('be.visible')
      .click() //vuce btn iz POM-a
      
      cy.contains('h6','Timesheet for Toma Nikolic')
      .should('exist').and('be.visible')
      cy.get('.oxd-date-input').find('input').eq(0).click()    //date picker
            cy.get('.oxd-calendar-wrapper').should('exist')
            cy.get('.oxd-calendar-selector-month').should('be.visible').click()
            cy.get('.oxd-calendar-dropdown').children().contains('December').click()
            cy.get('.oxd-calendar-selector-year').should('be.visible').click()
            cy.get('.oxd-calendar-dropdown').children().contains('2022').click()
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

            cy.get('#oxd-toaster_1') //asserting popup message
            .should('be.hidden') // element is hidden
            
            .invoke('show')
            cy.get('.oxd-toast').children()
            .contains('InfoNo Records Found').should('be.visible')
            //cy.get('.oxd-button').contains('Edit').should('exist').and('be.visible').click()
           
            
                    
           
      cy.get('.oxd-text').then(($text) => {
              if ($text.text().includes('No Timesheets Found')) 
              {
                //Create timesheet
                cy.get('.oxd-button').contains('Create Timesheet').should('exist').and('be.visible').click()
                cy.get('oxd-toast > oxd-toast--info > oxd-toast-container--toast').should('exist').and('be.visible')
              } 
              else 
              {
                //Edit time sheet
                
               
                cy.get('.oxd-button').contains('Edit').should('exist').and('be.visible').click()
                 
              }
            })
            

              cy.contains('.orangehrm-timesheet-body','Project').should('be.visible')
              cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(1)',{timeout:10000}).type('Nike')
              
              cy.contains('.oxd-autocomplete-option > span','Nike - Testing app').click()
              cy.get('.oxd-select-text-input').contains('Select').click()
              cy.get('.oxd-select-dropdown > :nth-child(2) > span').contains('Testng the app')
             
              .click()
              cy.get('.oxd-select-text-input').should('contain.text', 'Testng the app')
              //orangehrm-timesheet-table --editable
              //cy.get('.orangehrm-timesheet-table-body').children().find('input').next()
              //.next().type('2',{force:true})
              //.next().type('2',{force:true})
              //.next().type('2',{force:true})
              //.next().type('2',{force:true})
              //.next().type('2',{force:true})
                cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(3)').type('2')
                cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(4)').type('2')
                cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(5)').type('2')
                cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(6)').type('2')
                cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(7)').type('2')
                
    







  //})
        //it('change the date',() => {   
          //it.only('From Date', () => {

             
            //cy.get('.oxd-date-input-calendar').should('exist').and('be.visible')
            //cy.get('.oxd-date-input > .oxd-icon').should('exist').and('be.visible').click()
            //cy.get('oxd-icon > .bi-calendar > .oxd-date-input-icon')
            //cy.get('.oxd-date-input').parent('.oxd-date-wrapper').siblings()
              //.scrollIntoView()
              //.within(() => {
              //cy.window().then((win) => {
              //cy.contains('December').then(($el) => {
               //const before = win.getComputedStyle($el[0], '::before')
               //const beforeContent = before.getPropertyValue('\f1f6')
                    //the content is a string, thus we need to quote it
               //expect(beforeContent).to.equal('December')
                //})
                //})
              //})  
                  //cy.get('.oxd-calendar-selector-year-selected > .oxd-icon').click()
                  //cy.contains('2022').click()
                  //cy.get('.oxd-calendar-selector-month-selected > .oxd-icon').click()  
                  //cy.contains('November').click()
                  //cy.get(':nth-child(21) > .oxd-calendar-date').click()  
        //})   
        
       

            

        


      })

})
