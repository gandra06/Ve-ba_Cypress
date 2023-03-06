/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

Given('user is logged in', () => {
    cy.visit('/')
    cy.loginForm()   

});

When('user navigate to PIM page',() => {
    cy.PIM()

});

And('click on Add button', () =>{
    cy.get('button').contains('Add').click()
    

});
And('enter required data', () =>{
   cy.getInput('First Name').type('Pera')
   cy.getInput('Last Name').type('Detlic')
});
And('enter required data', () =>{
    cy.get('button').contains('Save').click()
 });
 Then('user is on Personal Details page', () => {
    cy.contains('Personal Details').should('be.visible')
 })
 
