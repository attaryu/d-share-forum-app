/// <reference types="Cypress" />
/*
 Test Flow :
  * Login page test flow
    - success visit login page
    - when successful login will be redirected to the home page
    - when the session token is still stored it will automatically log in when visiting
      the login page and go log out
*/

describe('Login page test flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('success visit login page', () => {
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('when successful login will be redirected to the home page', () => {
    cy.get('input[placeholder="Email"]').type('usertester@gmail.com');
    cy.get('input[placeholder="Password"]').type('usertester');
    cy.get('button[type="submit"]').contains(/Log in/i).click();

    cy.wait(5000);
    cy.get('header').contains(/^Home$/).should('be.visible');
  });

  it('when the session token is still stored it will automatically log in when visiting the login page and go log out', () => {
    cy.wait(5000);
    cy.get('header').contains(/^Home$/).should('be.visible');
    cy.get('a[href="/profile/me"]').click();

    cy.wait(5000);
    cy.contains(/Log out/i).click();
  });
});
