Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
describe('API testing', () => {


    it('GET testing TimesheetAPI', () => {
        cy.visit('/')
        cy.loginForm()
        
        cy.request({
            method : 'POST',
            url : 'http://localhost/orangehrm/web/index.php/auth/validate',
           
           body:{
            _token:"e3273970.R9bIIhmGwF1gTW_Xsm6IxsM5K-ivJbdc0MON0PNwDiQ.DuT5bnXrkDw6DDW-0z_njowOY63DQo4z443So5AKXVAY5I1bUcm0PiF6Ig",
            username: "admin",
            password:"Yorad2906.",

           },
           
        })
        cy.get('.oxd-userdropdown-name').contains('Goran Andrejevic')
        cy.url().should('include', '/dashboard/index')
        //cy.get('a[href="/orangehrm/web/index.php/auth/logout"]').should('be.active')



    })


  it.only('Nova proba', () => {
  cy.request({
    method: 'POST',
    url: '/web/index.php/auth/validate_with_form', // baseUrl is prepend to URL
    form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
    body: {
        _token:"e3273970.R9bIIhmGwF1gTW_Xsm6IxsM5K-ivJbdc0MON0PNwDiQ.DuT5bnXrkDw6DDW-0z_njowOY63DQo4z443So5AKXVAY5I1bUcm0PiF6Ig",
      username: 'admin',
      password: 'Yorad2906.',
    },
  })
  
  // to prove we have a session
  cy.getCookie('cypress-session-cookie').should('exist')
  })

})