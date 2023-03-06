import { login } from '../../cypress/support/POM/Login.cy'
import { sidebar } from'../../cypress/support/POM/sidebar.cy'
import { hrmEditButton } from '../../cypress/support/POM/orangeHRMbtn.cy'
require('cypress-downloadfile/lib/downloadFileCommand')
//import "cypress-localstorage-commands";
const compareSnapshotCommand = require('cypress-image-diff-js/dist/command')
compareSnapshotCommand()

Cypress.Commands.add('loginForm', () => {
  cy.clearCookies()
  cy.getCookies().should('be.empty')
  cy.visit('/')
  onBeforeLoad: (win) => {
    win.sessionStorage.clear()
  }
  //cy.get(login.usernameFld).type('admin')
  //cy.get(login.passwordFld).type('Yorad2906.')
  //cy.contains(login.loginBtn , 'Login').click()
  cy.intercept('GET', 'http://localhost/orangehrm/web/index.php/dashboard/index').as('dashBoard')
  cy.get('form').within(($form) => {
    cy.get('input')
    cy.get('input[name="username"]').type('admin')
    cy.get('input[name="password"]').type('Yorad2906.')
    cy.root().submit()
  cy.url().should('include', '/dashboard/index')
  });
})
Cypress.Commands.add("interceptLogin", () => {
cy.intercept('GET', ' http://localhost/orangehrm/web/index.php/core/i18n/messages', (req) => {
    delete req.headers['if-none-match'];
  }).as('message')
});

Cypress.Commands.add("Time", () => {
 
    cy.wait('@dashBoard')
    cy.get(sidebar.sidebarview)
      .find('a')
      .contains('Time')
      .click()
    cy.url().should('include', '/time/viewEmployeeTimesheet')
      
});

Cypress.Commands.add("PIM", () => {
      cy.get(sidebar.sidebarview)
        .find('a')
        .contains('PIM')
        .click({force:true})
      cy.url().should('include', '/pim/viewEmployeeList')

});

Cypress.Commands.add("SelectEmployee", () => {
      cy.get('.oxd-autocomplete-text-input > input').should('exist').and('be.visible').type('Toma')
           
            
        cy.contains('.oxd-autocomplete-option > span','Toma Nikolic',{timeout:10000}).should('be.visible').click()
            
        cy.contains(hrmEditButton.timeSheetBtn ,'View').should('be.visible').click() //vuce btn iz POM-a
           
        cy.contains('h6','Timesheet for Toma Nikolic').should('exist').and('be.visible')
});

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
});

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
        } 
        else 
        {
              //Edit time sheet
              
             cy.get('.oxd-text--subtitle-2').contains('Status: Not submited').should('exist').and('be.visible')
          cy.get('.oxd-button').contains('Edit').should('exist').and('be.visible').click()
               
        }
      })
});
    
  //Cypress.Commands.add("interceptTime", () => {
    //cy.intercept('GET', '/orangehrm/web/index.php/api/v2/time/employees/timesheets/list?limit=50&offset=0').as('admtieView')
      //cy.wait('@timeView')
      
      //})
Cypress.Commands.add("loginAPI", () => {
        cy.visit('/')

        cy.request({
            method : 'POST',
            url : '/web/index.php/auth/validate',
            headers: {
              Cookie: '_orangehrm=3kk6htov64l5d9i9u0rpscaose'
          },
           
           body:{
            _token:"e3273970.R9bIIhmGwF1gTW_Xsm6IxsM5K-ivJbdc0MON0PNwDiQ.DuT5bnXrkDw6DDW-0z_njowOY63DQo4z443So5AKXVAY5I1bUcm0PiF6Ig",
            username: "admin",
            password:"Yorad2906.",

           },
        })

});
  // Find element by selecting it's label
Cypress.Commands.add("getSel", (labelText) => {
  cy.contains(labelText).parent().next().find('input')
});
  // Find Input field with inner text matching
  Cypress.Commands.add("getInput", (labelText) => {
  cy.contains(labelText).find('input')
});

// Get certain element by selecting it label with labelText
Cypress.Commands.add("getSelect", (labelText) => {
  cy.contains(labelText).parent().next().children().children().children().first()

});

//Yield value of the field, and verify it has value Text   CHANGE to verifyText instead getText
Cypress.Commands.add("getText", (labelText, Text) => {
  cy.contains(labelText).parent().next().children().children().children().first()
      .contains(Text)
  });

  // Type whatever in the field with label being labelText
Cypress.Commands.add("inputField", (labelText, whatever) => {
  cy.contains(labelText).parent().next().find('input').type(whatever)
});

// Chose certain offer in drop-down meny
Cypress.Commands.add("choseSelect", (labelText, text) => {
  cy.contains(labelText).parent().next().children().children().children().eq(1).click({force:true})
      .then(() => {
          cy.contains(labelText).parent().next().children().children().eq(1).children()
            .contains(text).click()
      })
});

// Activate date-picker and open it
Cypress.Commands.add("pickDate", (labelText) => {
  cy.contains(labelText).parent()
        .children().children().children('.oxd-date-wrapper').children().find('i').click({force:true})

    //.then(() => {
      //cy.contains('.oxd-date-input-calendar').children().children().eq(1)
    //})
});

Cypress.Commands.add('Get week range from date', () => {
  
  var dt = new Date()  //current date of week
var currentWeekDay = dt.getDay();
var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay-1
var wkStart = new Date(new Date(dt).setDate(dt.getDate()- lessDays));
var wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate()+6));
})   
