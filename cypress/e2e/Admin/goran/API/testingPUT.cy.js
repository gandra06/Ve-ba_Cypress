/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('PUT API testing', () => {
    it('PUT, add midle name', () => {
        cy.loginForm()
       
        cy.request({
            method: 'PUT',
            url: 'http://localhost/orangehrm/web/index.php/api/v2/pim/employees/0052/personal-details',
            headers: {
                Cookie: '_orangehrm=kc9jb07j2vb99vugtq405o3h21'
            },
            body: {
                birthday: null,
                drivingLicenseExpiredDate: null,
                drivingLicenseNo: "3235423",
                employeeId: "0054",
                firstName: "lo",
                gender: null,
                lastName: "lo",
                middleName: "ll",
                otherId: ""

            }

        }).then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)
            expect(response.body.data.birthday).to.eq(null)
            expect(response.body.data.middleName).to.eq('ss')
            expect(response.body.data.nationality.id).to.eq(null)
            expect(response.body.meta).to.have.length(0)
            expect(response.body.rels).to.have.length(0)

        })
    })
})