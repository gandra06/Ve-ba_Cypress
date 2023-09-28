import { login } from '../POM/Login.cy';

export default class LoginScenario {




    constructor(userName = '', password = '') {

        this.userName = userName;
        this.password = password;

    };

   
    execute() {
        cy.visit('http://localhost/orangehrm/web/index.php/auth/login');
        cy.get('.orangehrm-login-logo').should('be.visible');
        cy.get(login.username).type(this.userName);
        cy.get(login.password).type(this.password);
        cy.get(login.login).contains('Login').click();

    }




};



