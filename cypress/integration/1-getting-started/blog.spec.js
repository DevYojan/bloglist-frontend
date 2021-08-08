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
      cy.get('.error').should('have.css', 'background-color', 'rgb(255, 0, 0)');
    });
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.get('#username').type('yojan');
      cy.get('#password').type('regmi');
      cy.get('button').click();
    });

    it('user can create a new blog', () => {
      cy.contains('New Blog').click();
      cy.get('#title').type('New blog by cypress');
      cy.get('#author').type('cypress');
      cy.get('#url').type('cypress.com');
      cy.get('.submitButton').click();
      cy.contains('New blog by cypress');
    });

    it.only('user can like a blog', () => {
      cy.contains('New Blog').click();
      cy.get('#title').type('New blog by cypress');
      cy.get('#author').type('cypress');
      cy.get('#url').type('cypress.com');
      cy.get('.submitButton').click();
      cy.contains('view').click();
      let likes;
      cy.get('.likes')
        .find('#likes')
        .then(($likes) => {
          likes = $likes.text();
        });
      cy.get('.likeButton').click();
      cy.get('.likes')
        .find('#likes')
        .then(($afterLikes) => {
          setTimeout(() => {
            cy.expect(Number($afterLikes.text())).to.equal(Number(likes + 1));
          }, 1000);
        });
    });
  });
});
