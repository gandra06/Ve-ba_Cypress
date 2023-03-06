/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
    
describe('API testing', () => {

    it('Login User', () =>{
        const username = 'admin'
        const password = 'Yorad2906.'
        cy.request({
            
            url : 'http://localhost/orangehrm/web/index.php/auth/validate',
            form : true,
            body : {
                username,
                password,
            },

        })
    })




})