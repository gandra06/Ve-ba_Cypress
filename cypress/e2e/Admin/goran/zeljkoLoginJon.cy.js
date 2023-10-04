/// <reference types="Cypress" />
import LoginScenario from "../../../support/scenarios/loginScenario1.cy"
//import employee from "../../fixtures/example.json"


Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})




describe('Login procedure with admin', () => {

    let ScenarioLogin;
    let data;

    before(() => {

        cy.fixture('example.json').then((scenarios) => {
            data = scenarios

        });

    });

    it('logs in with admin account', () => {
        for (let i = 0; i < data.length; i++) {

            const user = data[i];
            ScenarioLogin = new LoginScenario(user.userName, user.password);
            ScenarioLogin.execute();

            cy.url().then(($url) => {
                cy.wait(1000)
                cy.log($url)
                if ($url.includes('/dashboard/')) {
                    cy.get(login.logedInBtn).click()
                    cy.wait(1000)
                    cy.get(login.logOutBtn).click()
                } 
                 else {
                    cy.log('SVE OK')
                 }

            });
 
        }

    });

});

