import { login } from '../POM/Login.cy';

export default class LoginScenario {




    constructor(userName = '', password = '') {

        this.userName = userName;
        this.password = password;

    };

   
    execute() {
        cy.visit('http://localhost/orangehrm/web/index.php/auth/login')
        cy.get(login.loginLogo).should('be.visible')
        if (this.userName !== '') {
            
        cy.get(login.username).type(this.userName)

        }
        if (this.password !== '') {
            
        cy.get(login.password).type(this.password)

        }
        cy.get(login.login).contains('Login').click()
        
           
        if (this.userName === '' || this.password === '') {

        cy.url().should('include', '/login') 
        cy.get(login.requiredNotification).contains('Required').should('be.visible')

        }
    }



};



