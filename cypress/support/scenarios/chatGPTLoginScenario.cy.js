import { login } from "../../support/POM/chatGPTLogin.cy";
//const login = require('../POM/chatGPTLogin.cy.js');

export default class LoginScenario {
    constructor(userName = '', password = '') {
        this.userName = userName;
        this.password = password;
    }

    execute() {
        cy.visit('http://localhost/orangehrm/web/index.php/auth/login');
        cy.wait(1000)
        cy.get(login.loginLogo).should('be.visible');

        if (this.userName !== '') {
            // 
            cy.inputField('Username', this.userName)
            //login.enterUsername(this.userName);
        }

        if (this.password !== '') {
            cy.inputField('Password', this.password)
            //login.enterPassword(this.password);
        }

        cy.clickButton('Login');

        // Provera rezultata prijave
        cy.url().then(($url) => {
            if ($url.includes('/dashboard/')) {
                cy.log('Prijavili ste se uspešno!');
                // Ovde možete dodati dalje korake nakon uspešne prijave ako je potrebno
            } else if ($url.includes('/login')) {
                cy.get(login.requiredNotification).then(($requiredNotification) => {
                    const notificationText = $requiredNotification.text();

                    if (notificationText.includes('Invalid credentials')) {
                        cy.log('Pogrešno korisničko ime ili lozinka.');
                    } else if (notificationText.includes('Required')) {
                        cy.log('Obavezna polja nisu popunjena.');
                    }
                });
            }
        });
    }
}