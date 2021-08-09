describe('blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'yojan',
      password: 'regmi',
      name: 'Yojan Regmi',
    });

    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'bhatij',
      password: 'bhatij',
      name: 'Regmi Yojan',
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
  });

  describe('when logged in and when there is a blog', () => {
    beforeEach(() => {
      cy.get('#username').type('yojan');
      cy.get('#password').type('regmi');
      cy.get('button').click();

      cy.contains('New Blog').click();
      cy.get('#title').type('New blog by cypress');
      cy.get('#author').type('cypress');
      cy.get('#url').type('cypress.com');
      cy.get('.submitButton').click();
    });

    it('user can like a blog', () => {
      cy.contains('view').click();
      let likes;
      cy.get('.likes')
        .find('#likes')
        .then(($likes) => {
          likes = $likes.text();
        });
      cy.get('.likeButton').click();
      cy.wait(500);
      cy.get('.likes')
        .find('#likes')
        .then(($afterLikes) => {
          cy.expect(Number($afterLikes.text())).to.equal(Number(likes + 1));
        });
    });

    it('author can delete his blog', () => {
      cy.contains('view').click();
      cy.get('.deleteButton').click();
      cy.contains('New blog by cypress').should('not.exist');
    });

    it('cannot delete others blog', () => {
      cy.wait(1000);
      cy.contains('Logout').click();

      cy.get('#username').type('bhatij');
      cy.get('#password').type('bhatij');
      cy.get('button').click();
      cy.contains('view').click();
      cy.get('.deleteButton').should('not.exist');
    });

    it.only('blogs are sorted according to likes', () => {
      cy.wait(500);
      cy.addBlog({ author: 'regmi', title: 'First try', url: 'regmi.com' });
      cy.addBlog({ author: 'yojan', title: 'second try', url: 'regmi.com' });
      cy.addBlog({ author: 'bhatij', title: 'third try', url: 'regmi.com' });
      cy.addBlog({ author: 'yalien', title: 'fourth try', url: 'regmi.com' });
      cy.addBlog({ author: 'yyyy', title: 'fifth try', url: 'regmi.com' });

      cy.get('.blog')
        .eq(4)
        .contains('view')
        .click()
        .parent()
        .contains('like')
        .click()
        .wait(300)
        .click()
        .wait(300)
        .click();

      cy.wait(500);

      cy.get('.blog')
        .eq(5)
        .contains('view')
        .click()
        .parent()
        .contains('like')
        .click()
        .wait(300)
        .click()
        .wait(300)
        .click()
        .wait(300)
        .click();

      cy.wait(500);

      cy.get('.blog')
        .eq(3)
        .contains('view')
        .click()
        .parent()
        .contains('like')
        .click()
        .wait(300)
        .click()
        .wait(300)
        .click()
        .wait(300)
        .click()
        .wait(300)
        .click();

      let like1;
      cy.get('.likes')
        .eq(0)
        .find('#likes')
        .then(($like1) => {
          like1 = $like1.text();
          console.log(like1);
        });

      let like2;
      cy.get('.likes')
        .eq(1)
        .find('#likes')
        .then(($like2) => {
          like2 = $like2.text();
          expect(Number(like1)).to.equal(Number(like1) + Number(like1 - like2));
        });
    });
  });
});
