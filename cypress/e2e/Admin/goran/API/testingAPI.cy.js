/// <reference types="Cypress" />

import { hrmEditButton } from '../../../../support/POM/orangeHRMbtn.cy' 
//import data from '../../../../fixtures/apiItems.json'
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

const datePickerData = [
  {
    "id": 17,
    "startDate": "2022-12-19",
    "endDate": "2022-11-25",
  }
 ];
 const datePickerStatus = [
  {
    "id": "NOT SUBMITED",
    "NAME": "not submited",
  }
 ];
 
    
describe('API testing', () => {
   
 before(() => {
 cy.visit('/');
 cy.loginForm();

 //cy.saveLocalStorage();
 })
 

 beforeEach(() => {
    //cy.loginAPI();
    Cypress.Cookies.preserveOnce('_orangehrm', 'i2n99vbi7v0ktcoa28iup53d17');
    cy.Time();
    cy.url().should('include', '/viewEmployeeTimesheet');
    cy.restoreLocalStorage();
 })
 after(() => {
    cy.clearCookies()
 })
 it('GET testing TimesheetAPI', () => {
    cy.request({
        method : 'GET',
        url : 'http://localhost/orangehrm/web/index.php/api/v2/time/employees/timesheets/list?limit=50&offset=0',
       
    })
    .then( (board) => {
      cy.log(JSON.stringify(board.body))
    
      cy.log(board.status) // 201
      cy.log(JSON.stringify(board.headers))
      cy.log(board.body)
      cy.log(JSON.stringify(board.body.data))
      cy.log(JSON.stringify(board.body.data.employee))
      //expect(response.status).to.eq(200)
    })
      //.should((board) => {
        //cy.log(JSON.stringify(board.body))

      //})

    

 })
 it('Testing headers/content-type', () => {
      cy.request({
        method : 'GET',
        url : 'http://localhost/orangehrm/web/index.php/api/v2/time/employees/timesheets/list?limit=50&offset=0',
       
    })
    .its('headers')
    .its('content-type')
    .should('include', 'application/json')

 })
 it('Testing items from end point', () => {
    cy.request({
        method : 'GET',
        url : 'http://localhost/orangehrm/web/index.php/api/v2/time/employees/timesheets/list?limit=50&offset=0',
       
    })
    
    .its('body.data.0.employee.firstName')
    
    
    .should('include', 'Goran')
    
    


 })
 it.only('Initial items from End point', () => {
  cy.intercept('GET','http://localhost/orangehrm/web/index.php/api/v2/time/timesheets/default?date=2022-12-23&empNumber=6')
  .as('getDateRange')
  cy.intercept('GET','http://localhost/orangehrm/web/index.php/api/v2/time/employees/timesheets/17/entries')
  .as('getEmployeeData')
  cy.get('.oxd-autocomplete-text-input > input').should('exist').and('be.visible').type('Toma')
           
            
      cy.contains('.oxd-autocomplete-option > span','Toma Nikolic')
      .should('exist').and('be.visible')
      .click()
      cy.get('form').within(($form) => {      
        cy.root().submit()
      })
      //cy.get('.oxd-form-actions > .oxd-button').contains('View')
      //.scrollIntoView()
      //.should('include' ,'View')
      // .should('exist').and('be.visible')
      //.click() //vuce btn iz POM-a
      
      cy.contains('h6','Timesheet for Toma Nikolic')
      .should('exist').and('be.visible')
      cy.get('.oxd-date-input').find('input').eq(0).click()    //date picker
            cy.get('.oxd-calendar-wrapper').should('exist')
            cy.get('.oxd-calendar-selector-month').should('be.visible').click()
            cy.get('.oxd-calendar-dropdown').children().contains('December').click()
            cy.get('.oxd-calendar-selector-year').should('be.visible').click()
            cy.get('.oxd-calendar-dropdown').children().contains('2022').click()
            cy.get('.oxd-calendar-dates-grid').contains('23').click()
            cy.request({
              method : 'GET',
              url : 'http://localhost/orangehrm/web/index.php/api/v2/time/timesheets/default?date=2022-12-23&empNumber=6'
              
            })
              .then( (board) => {
                cy.log(JSON.stringify(board.body))
              
                //cy.log(board.status) // 201
                cy.log(JSON.stringify(board.headers))
                //cy.log(board.body)
                //cy.log(JSON.stringify(board.body.data))
              //})
              //cy.intercept('GET','http://localhost/orangehrm/web/index.php/api/v2/time/timesheets/default?date=2022-12-23&empNumber=6',
                //headers:
                //{
                  //Cookies: '_orangehrm=j6mphdp50pfhnga9nco97mt0ii'
                //}
                //(res)=> {
                  //cy.log(JSON.stringify(res.body))
                  //cy.log(JSON.stringify(res.headers))  
                })//.as('res')
              //.then(res)
              

                //cy.get('@res').then(res1 => {
                  //cy.log(JSON.stringify(res1))
                  //cy.log(JSON.stringify(res1.body))
                  //cy.log(JSON.stringify(res1.body.meta))
                  //cy.log(JSON.stringify(res1.body.meta.timesheet))
                  //cy.log(JSON.stringify(res1.body.meta.status))


                //.its(board.body)
                //.should('be.deep.equal', datePickerData)
                //.expect(res1.body.meta.timeSheet).to.eq(datePickerData)
                //.its(board.body.data.status)
                //.should('be.deep.equal', datePickerStatus)
                //expect(response.body.meta.status).to.eq(datePickerStatus)
            //})
  })





})