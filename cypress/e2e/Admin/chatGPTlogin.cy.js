import LoginScenario from "../../support/scenarios/chatGPTLoginScenario.cy";
import testData from "../../fixtures/example.json";
import { login } from "../../support/POM/chatGPTLogin.cy"
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Testiranje prijave', () => {
    it('Testiranje različitih kombinacija prijave', () => {
        testData.forEach((data, index) => {
            const scenario = new LoginScenario(data.userName, data.password);
            cy.log(`Test ${index + 1}: Prijavljivanje kao "${data.userName}"`);
            scenario.execute();

            cy.url().then(($url) => {
                cy.wait(1000)
                
                if ($url.includes('/dashboard/')) {
                    cy.log('SVE JE OK!')
                    cy.get(login.logedInBtn).click()
                    cy.wait(1000)
                    cy.get(login.logOutBtn).click()
                } 
                

            })
        });
    });
});