import { login } from '../../cypress/support/POM/Login.cy'
import { sidebar } from'../../cypress/support/POM/sidebar.cy'
import { hrmEditButton } from '../../cypress/support/POM/orangeHRMbtn.cy'
//import "cypress-localstorage-commands";

Cypress.Commands.add('loginForm', () => {
  cy.clearCookies()
  cy.getCookies().should('be.empty')
  cy.visit('/')
  onBeforeLoad: (win) => {
    win.sessionStorage.clear()
  }
  cy.get(login.usernameFld).type('admin')
  cy.get(login.passwordFld).type('Yorad2906.')
  cy.contains(login.loginBtn , 'Login').click()
  cy.url().should('include', '/dashboard/index')
})

 Cypress.Commands.add('login1', () => { 
  cy.request({
  method: 'POST',
  url: '/web/index.php/auth/validate',
  body: {
  user: {
  Username: 'admin',
  Password: 'Yorad2906.',
  }
  }
  })
  .its('body')
  .then(body => {
  cy.setLocalStorage("jwt", body.user.token)
  //.then((resp) => {
  //  window.localStorage.setItem('jwt', resp.body.user.token)
  })  
  })
  //Cypress.Commands.add('Login', (username , password) => {
  //  cy.session([username , password], () => {
  //    cy.request({
  //      method: 'POST',
  //      url: '/web/index.php/auth/validate',
  //      body: { username, password},
  //    }).then(({ body }) => {
  //      window.localStorage.setItem('authToken', body.token)
  //    })
  //  })
  //})
//})

Cypress.Commands.add("interceptLogin", () => {
cy.intercept('GET', ' http://localhost/orangehrm/web/index.php/core/i18n/messages', (req) => {
    delete req.headers['if-none-match'];
  }).as('message')
})

  Cypress.Commands.add("Time", () => {
    cy.get(sidebar.sidebarview)
      .find('a')
      .contains('Time')
      .click()
    }) 
    Cypress.Commands.add("SelectEmployee", () => {
      cy.get('.oxd-autocomplete-text-input > input').should('exist').and('be.visible').type('Toma')
           
            
        cy.contains('.oxd-autocomplete-option > span','Toma Nikolic',{timeout:10000}).should('be.visible').click()
            
        cy.contains(hrmEditButton.timeSheetBtn ,'View').should('be.visible').click() //vuce btn iz POM-a
           
        cy.contains('h6','Timesheet for Toma Nikolic').should('exist').and('be.visible')
    })
    Cypress.Commands.add("fillProjectActivityHours", () => {
      //Select Project
      cy.contains('.orangehrm-timesheet-body','Project').should('be.visible')
            cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(1)',{timeout:10000}).type('Nike')
            cy.contains('.oxd-autocomplete-option > span','Nike - Testing app').should('be.visible').click()
       //Select Activity     
      cy.get('.orangehrm-timesheet-table-body').contains('Select').click()
              
            cy.get('.oxd-select-dropdown > :nth-child(2) > span').contains('Testng the app').click()
            //enter working hours for each day
            //cy.get('.orangehrm-timesheet-table').children().children().children().children().find('.oxd-input').type('2')
            cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(3)').type('2')
            cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(4)').type('2')
            cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(5)').type('2')
            cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(6)').type('2')
            cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(7)').type('2')
    }) 
    Cypress.Commands.add("createTimeSheet", () => {
      cy.get('.oxd-text').then(($text) => {
        if ($text.text().includes('No Timesheets Found')) 
        {
              //Create timesheet
          cy.get('.oxd-button').contains('Create Timesheet').should('exist').and('be.visible').click()
          cy.get('oxd-toast > oxd-toast--info > oxd-toast-container--toast').should('exist').and('be.visible')
          //find success message
          //cy.get('#oxd-toaster_1')
          //.should('be.hidden') // element is hidden
          
          //.invoke('show')
          //cy.get('.oxd-toast').children()
          //.contains('SuccessTimesheet Successfully Created').should('be.visible')
          cy.get('.oxd-button').contains('Edit').should('exist').and('be.visible').click()
        } else 
        {
              //Edit time sheet
              
             cy.get('.oxd-text--subtitle-2').contains('Status: Not submited').should('exist').and('be.visible')
          cy.get('.oxd-button').contains('Edit').should('exist').and('be.visible').click()
               
        }
      })
    })
    
  //Cypress.Commands.add("interceptTime", () => {
    //cy.intercept('GET', '/orangehrm/web/index.php/api/v2/time/employees/timesheets/list?limit=50&offset=0').as('admtieView')
      //cy.wait('@timeView')
      
      //})
      
