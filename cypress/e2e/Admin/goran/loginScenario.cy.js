/// <reference types="cypress" />
import LoginScenario from "../../../support/scenarios/loginScenario1.cy.js";



describe('Login procedure with admin', () => {
    
        
    it('logs in with admin account',() => {
        let n=0
        cy.fixture('example.json')
        .then((user) => { 
             ScenarioLogin = new LoginScenario(user[n].userName, user[n].password);

          ScenarioLogin.execute()
        }) 

       
        cy.PIM()
        
    })
});