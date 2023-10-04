import { login } from '../POM/Login.cy';

export default class LoginScenario {




    constructor(userName = '', password = '') {

        this.userName = userName;
        this.password = password;

    };

   
    execute() {
        cy.visit('http://localhost/orangehrm/web/index.php/auth/login');
        cy.get('.orangehrm-login-logo').should('be.visible');
        if (this.userName === '') {
            if (this.password === '') {
                cy.get(login.login).contains('Login').click();
    
                cy.url().should('include', '/login')
    
            cy.get('.oxd-text').contains('Required').should('be.visible')
            } else {
         cy.get(login.password).type(this.password);
         cy.get(login.login).contains('Login').click(); 
            }
        }
         else {
        cy.get(login.username).type(this.userName);
            }
        
        if (this.password === '') {
            cy.get(login.login).contains('Login').click();

            cy.url().should('include', '/login')

           cy.get('.oxd-input-group > .oxd-text').contains('Required').should('be.visible')
        } else {
           cy.get(login.password).type(this.password);
           cy.get(login.login).contains('Login').click();

          }
    }



};



