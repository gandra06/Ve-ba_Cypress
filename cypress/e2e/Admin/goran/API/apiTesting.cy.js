/// <reference types="Cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

    const endPoint = 'http://localhost/orangehrm/web/index.php/api/v2/pim/addEmployee'
    

    const newUserObject = {  
    "empNumber": 99,
    "firstName": "Goran",
    "lastName": "Andrejevic",
    "middleName": "",
    "terminationId": null,
    };

      
describe('API testing', () => {
   
 before(() => {
 cy.visit('/')
 cy.loginForm()
  })
  beforeEach(() => {
    //cy.loginAPI()

    //Cypress.Cookies.preserveOnce('_orangehrm', 'i2n99vbi7v0ktcoa28iup53d17')
    cy.PIM()
    cy.url().should('include', '/addEmployee')
    //cy.restoreLocalStorage();
 })
 after(() => {
    cy.clearCookies()
    //cy.task('clearUser')
 })

 it('Testing POST metod', () => {
  cy.request({
    method:'POST', 
    url: endPoint,
  headers: {
    Cookie: '_orangehrm=h4819jhqvalm2bmee46e3sgk7t'
},
body:
newUserObject
  })
  cy.request('GET', endPoint)

  //its('body')
  //.should('deep.equal','newUserObject')
  .then( (board) => {
    
    cy.log(board.status) // 201
    
    cy.log(board.body)
    

  })

 })


})

