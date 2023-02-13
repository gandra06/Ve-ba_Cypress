import { dataAPI } from '../../../../fixtures/apiItems.json'
import { login } from '../../../Login.cy'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('POST API testing', () => {
    before(() => {
        //cy.clearCookies();
        //cy.visit('/');
        cy.loginForm();
        //cy.clearLocalStorage()
    })
    //beforeEach(() => {
        //cy.loginAPI();
        //console.log(body)
    //})
    //after(() => {
        //cy.clearCookies()
           
     //})
    it('POST, create new user', () => {
        //cy.visit('/');
        //cy.loginForm();
        //cy.url().should('include', '/dashboard/index');
        cy.PIM();
        cy.url().should('include', '/pim/addEmployee');
        cy.request({
            method: 'POST',
            url: 'http://localhost/orangehrm/web/index.php/api/v2/pim/addEmployee',
            headers: {
                //cookie: '_orangehrm=4ur792eg8qce7ma1jfnmp3so6g'
            },
            body: {
                "empNumber": "0097",
                "firstName": "Goran",
                "lastName": "Andrejevic",
                "middleName": "GA",
                "terminationId": null
            }
        }).then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)
            expect(response.body.data.employeeId).to.eq('0097')
            expect(response.body.data.firstName).to.eq('Goran')
            expect(response.body.data.lastName).to.eq('Andrejevic')
            expect(response.body.data.middleName).to.eq('GA')
            expect(response.body.data.terminationId).to.eq(null)
        })
    })
})