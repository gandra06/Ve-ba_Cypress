/// <reference types="Cypress" />
import LoginScenario from "../../../support/scenarios/loginScenario1.cy.js";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Login procedure with admin', () => {
    after(() => {
        cy.clearCookies()
      })
   
        
    it('logs in with admin account',() =>{
        let n=0
        cy.fixture('example.json')
        .then((user) => { 
            const ScenarioLogin = new LoginScenario(user.userName[n], user.password[n]);

          ScenarioLogin.execute()
        }) 

       
        cy.PIM()
        
    })
});