//import { sidebar } from '../../../support/POM/sidebar.cy'
import { hrmMsg } from '../../../support/POM/orangeHRMMsg.cy'
import { hrmEditButton } from '../../../support/POM/orangeHRMbtn.cy'
import { capitalize } from 'cypress/types/lodash'



Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
    
describe('Time', () => {
   
  before(() => {
 
  cy.loginForm();
  //cy.interceptLogin()
  
  cy.saveLocalStorage();
  });

  beforeEach(() => {
  //cy.Login('admin' , 'Yorad2906')
  
  cy.restoreLocalStorage();
  cy.Time();
  cy.url().should('include', '/viewEmployeeTimesheet');
  cy.saveLocalStorage();
  });



   

      it('check employee timesheet', () => {
        //cy.restoreLocalStorage();
    
       
        cy.get('.oxd-autocomplete-text-input > input').should('exist').and('be.visible').type('Toma')
           
            
        cy.contains('.oxd-autocomplete-option > span','Toma Nikolic',{timeout:10000}).should('be.visible').click()
            
        cy.contains(hrmEditButton.timeSheetBtn ,'View').should('be.visible').click() //vuce btn iz POM-a
           
        cy.contains('h6','Timesheet for Toma Nikolic').should('exist').and('be.visible')
           
    
    
        

            

            //cy.intercept('GET', '/orangehrm/web/index.php/api/v2/leave/workweek?model=indexed').as('dateInput')
            //cy.intercept('GET', '/orangehrm/web/index.php/api/v2/leave/holidays?fromDate=2022-01-01&toDate=2022-12-31').as('employeeEntries')
            //it('check employee timesheet primer 1', () => {
            //cy.get('.oxd-date-input > .oxd-icon').click()//click on the calendar icon
            //cy.get('.oxd-date-input-calendar"]', {force:true}).invoke('show') 
            //cy.get('button').then(($btn) => {
                //if ($btn.hasClass('active')) {
                  // do something if it's active
                //} else {
                  // do something else
                //}
              //})
      

            //cy.wait('@dateImput')
            //cy.intercept('GET', '/orangehrm/web/index.php/api/v2/time/employees/timesheets/2/entries').as('employeeEntries')
            //cy.wait('@employeeEntries')
           
            //})
            //it('edit employee timesheet', () => {
         
         
            //cy.contains('button','Create Timesheet').click()
        cy.get('.oxd-text').then(($text) => {
          if ($text.text().includes('No Timesheets Found')) 
          {
                //Create timesheet
            cy.get('.oxd-button').contains('Create Timesheet').should('exist').and('be.visible').click()
            cy.get('oxd-toast > oxd-toast--info > oxd-toast-container--toast').should('exist').and('be.visible')
            //find success message
            cy.get('#oxd-toaster_1')
            .should('be.hidden') // element is hidden
            
            .invoke('show')
            cy.get('.oxd-toast').children()
            .contains('SuccessTimesheet Successfully Created').should('be.visible')
            cy.get('.oxd-button').contains('Edit').should('exist').and('be.visible').click()
          } else 
          {
                //Edit time sheet
                
                //cy.get('.oxd-text--subtitle-2').contains('Status: Not submited').should('exist').and('be.visible')
            cy.get('.oxd-button').contains('Edit').should('exist').and('be.visible').click()
                 
          }
        })
              //select Project
              
            cy.contains('.orangehrm-timesheet-body','Project').should('be.visible')
            cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(1)',{timeout:10000}).type('Nike')
            cy.contains('.oxd-autocomplete-option > span','Nike - Testing app').should('be.visible').click()
              
              //select Activity
            cy.get('.orangehrm-timesheet-table-body').contains('Select').click()
              
            cy.get('.oxd-select-dropdown > :nth-child(2) > span').contains('Testng the app').click()
            //enter working hours for each day
            //cy.get('.orangehrm-timesheet-table').children().children().children().children().find('.oxd-input').type('2')
            cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(3)').type('2')
            cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(4)').type('2')
            cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(5)').type('2')
            cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(6)').type('2')
            cy.get('.orangehrm-timesheet-table-body > :nth-child(1) > :nth-child(7)').type('2')

            cy.get('.orangehrm-timesheet-footer--options').contains('Cancel').click ()
            //find popup message
            cy.get('#oxd-toaster_1')
            .should('be.hidden') // element is hidden
            
            .invoke('show')
            cy.get('.oxd-toast').children()
            .contains('InfoNo Records Found').should('be.visible')
            cy.get('.oxd-button').contains('Edit').should('exist').and('be.visible').click()
            //fill data
           cy.saveLocalStorage();

           
        
      })
      it('addDataToTimesheet',() => {

        cy.restoreLocalStorage();
        cy.SelectEmployee()
        //cy.CreateTimeSheet()
        cy.get('.oxd-text').then(($text) => {
          if ($text.text().includes('No Timesheets Found')) 
          {
            cy.get('.oxd-button').contains('Create Timesheet').should('exist').and('be.visible').click()
            //cy.get('oxd-toast > oxd-toast--info > oxd-toast-container--toast').should('exist').and('be.visible')
            cy.get('.oxd-button').contains('Edit').should('exist').and('be.visible').click()
          } else 
          {
                //Edit time sheet
                
                //cy.get('.oxd-text--subtitle-2').contains('Status: Not submited').should('exist').and('be.visible')
            cy.get('.oxd-button').contains('Edit').should('exist').and('be.visible').click()
                 
          }
        })
                //Create timesheet
           
        //cy.get('.oxd-button').contains('Edit').should('exist').and('be.visible').click()
        cy.fillProjectActivityHours()
        cy.contains('.orangehrm-timesheet-table-body-row' , 'Add Row')
        .find('button', '+').click()
        //cy.get('.orangehrm-timesheet-body').children().children().siblings().children().contains('Project').children().find('oxd-input-group').should('be.empty').type('Nike')
        //cy.contains('.oxd-input-group').parent().parent().siblings().first().contains('Project').type('Nike')
        //cy.contains('.orangehrm-timesheet-table-body-row').last().next().find('oxd-input-group', 
        cy.get('.orangehrm-timesheet-table-body > :nth-child(2)')// > :nth-child(1)')
        .find('input').first()
        .type('Nike')
        cy.contains('.oxd-autocomplete-option > span','Nike - Testing app').should('be.visible').click()
        cy.get('.orangehrm-timesheet-table-body')
        //cy.get('.orangehrm-timesheet-table-body > :nth-child(2) > :nth-child(1)')
        
        .contains('Select').click()
              
            //cy.get('.oxd-select-dropdown > :nth-child(2) > span').contains('Testng the app').click()
            cy.get('.oxd-select-dropdown').contains('Writing test cases').click()
            cy.get('.orangehrm-timesheet-table-body > :nth-child(2) > :nth-child(1)') //.each((row) => {
        .find('input').first()//cy.wrap(row)
        .next().type('2')
        .next().type('2')
        .next().type('2')
        .next().type('2')
        .next().type('2')
        .next().type('2')
      //})
      
            
      })









        it('change the date',() => {  
          cy.restoreLocalStorage(); 
          
           

            cy.contains('orangehrm-timeperiod-picker' ,'Timesheet Period').next().next().click()

             
              cy.get('oxd-date-input-calendar')
              .should('be.hidden')
              .invoke ('show')
              .invoke('text')
              cy.xpath('//*[text()[contains(.,"December")]]').click()

              cy.get('.oxd-calendar-selector-year-selected > .oxd-icon')//.click()
              cy.select('2022').click()
              //cy.get('.oxd-calendar-selector-month-selected > .oxd-icon').click()  
              //cy.select('November')//.click()
              cy.select(':nth-child(21) > .oxd-calendar-date')//.click()  
        })     
                
       

            

        


  
})
