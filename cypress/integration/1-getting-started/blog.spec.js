describe('blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'yojan',
      password: 'regmi',
      name: 'Yojan Regmi',
    });
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', () => {
    cy.contains('Login');
    cy.contains('Username');
    cy.contains('Password');
    cy.get('button').contains('Login');
  });

  describe('Login', () => {
    it('is successful with correct credentials', () => {
      cy.get('#username').type('yojan');
      cy.get('#password').type('regmi');
      cy.get('button').click();
      cy.contains('yojan logged in !');
    });

    it('fails with wrong credentials', () => {
      cy.get('#username').type('yalien');
      cy.get('#password').type('bhatij');
      cy.get('button').click();
      cy.contains('yojan logged in !').should('not.exist');
    });
  });
});
