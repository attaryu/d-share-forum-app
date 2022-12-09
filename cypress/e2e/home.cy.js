/// <reference types="Cypress" />
/*
 Test Flow :
  * Home page without auth test flow
    - visit home without login
    - the user is not authenticated then pressing up thread and downvote triggers the alert
      "Please login or register first"
    - visit home with login
    - the user is authenticated pressing up thread or downvote triggers icon
      then have red color
    - triggering the search button then triggering the search bar expansion, then
      searching 'introduction' and found the thread with the introduction category
*/

describe('Home page without auth test flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('visit home without login', () => {
    cy.get('header').contains(/^Home$/).should('be.visible');
    cy.get('a[href="/login"]').should('be.visible');
  });

  it('the user is not authenticated then pressing up thread and downvote triggers the alert "Please login or register first"', () => {
    cy.get('header').contains(/^Home$/).should('be.visible');

    cy.get('button[name="upVote"]').first().click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Please login or register first');
    });

    cy.get('button[name="downVote"]').first().click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Please login or register first');
    });
  });

  it('visit home with login', () => {
    cy.get('header').contains(/^Home$/).should('be.visible');
    cy.get('a[href="/login"]').should('be.visible').click();

    cy.wait(5000);
    cy.get('input[placeholder="Email"]').type('usertester@gmail.com');
    cy.get('input[placeholder="Password"]').type('usertester');
    cy.get('button[type="submit"]').contains(/Log in/i).click();
  });

  it('the user is authenticated pressing up thread or downvote triggers icon then have red color', () => {
    cy.get('header').contains(/^Home$/).should('be.visible');
    cy.get('a[href="/login"]').should('be.visible').click();

    cy.get('input[placeholder="Email"]').type('usertester@gmail.com');
    cy.get('input[placeholder="Password"]').type('usertester');
    cy.get('button[type="submit"]').contains(/Log in/i).click();

    cy.wait(5000);
    cy.get('header').contains(/^Home$/).should('be.visible');
    cy.get('button[name="upVote"]').first().click();
    cy.get('svg.text-red-600').first().should('be.visible');
    cy.get('a[href="/profile/me"]').click();

    cy.wait(5000);
    cy.contains(/Log out/i).click();
  });

  it('triggering the search button then triggering the search bar expansion, then searching \'introduction\' and found the thread with the introduction category', () => {
    cy.get('header').contains(/^Home$/).should('be.visible');
    cy.get('.w-80 > .text-xl').click();

    cy.get('.w-80 > .py-1').type('introduction');

    cy.get('.mt-10 > .font-semibold').should('be.visible');
  });
});
