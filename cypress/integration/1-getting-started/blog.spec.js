describe('blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', () => {
    cy.contains('Login');
    cy.contains('Username');
    cy.contains('Password');
    cy.get('button').contains('Login');
  });
});
