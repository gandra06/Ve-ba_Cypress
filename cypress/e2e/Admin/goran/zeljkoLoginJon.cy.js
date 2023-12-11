/// <reference types="Cypress" />
import LoginScenario from "../../../support/scenarios/loginScenario1.cy"
import { login } from "../../../support/POM/Login.cy"



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
                
                if ($url.includes('/dashboard/')) {
                    cy.log('SVE JE OK!')
                    cy.get(login.logedInBtn).click()
                    cy.wait(1000)
                    cy.get(login.logOutBtn).click()
                } 
                if ($url.includes('/login')) {
                    //asertovati pogrešne podatke
               cy.get(login.requiredNotification).then(($requiredNotification) => {
                const notificationText = $requiredNotification.text()
                if (notificationText.includes('Invalid credentials')) {
        
                    cy.log('UNETI PODACI SU POGRESNI!')
                }
                //aserovati prazna polja
                else if (notificationText.includes('Required')) {
                 
                    cy.log('OBAVENA POLJA NE MOGU BITI PRAZNA')
                 
                }
               })

                }  

            })
 
        }

    });

});

