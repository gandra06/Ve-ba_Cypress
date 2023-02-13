Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Api testing examples', () => {
    
    it('Api tesing POST', () => {
        cy.restoreLocalStorage();


        cy.loginForm()

        cy.request({
            method:'POST',
            url: 'http://localhost/orangehrm/web/index.php/api/v2/pim/employees',
            headers: {
                Cookie: '_orangehrm=egh3tauegok4f2s8vlpqh96mac'
            },
            body:{
                "firstName": "Goran",
                "lastName": "Andrejevic",
            },


        })
    })
})