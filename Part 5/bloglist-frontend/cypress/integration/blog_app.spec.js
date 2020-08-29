const user = {
  username: 'Inez',
  name: 'Inezka',
  password: 'gdytylkospojrze'
}
const baseApiUrl = 'http://localhost:3001/api'
const homePageUrl = 'http://localhost:3000'

Cypress.Commands.add('login', () => {
  cy.request('POST', `${baseApiUrl}/login`, { 
    username: user.username, password: user.password
  }).then(({body}) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit(homePageUrl)
  })
})
Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy
    .request({
      url: `${baseApiUrl}/blogs`, 
      method: 'POST', 
      body: { title, author, url, likes: likes || 0 },
      headers: {
        'Authorization': `bearer ${JSON.parse(window.localStorage.getItem('loggedBlogAppUser')).token}`
      }
    })
    .then(() => cy.visit(homePageUrl) )
})

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${baseApiUrl}/testing/reset`)
    cy.request('POST', `${baseApiUrl}/users`, user)
    
    cy.visit(homePageUrl)
  })
  it('Login form is shown', function () {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')

  })
  describe('Login', function () {
    it('succeds with correct credentials', function () {
      cy.get('input[name="username"]').type(user.username)
      cy.get('input[name="password"]').type(`${user.password}{enter}`)
      cy.contains(`${user.name} logged in`)
    })
    it('fails with wrong credentials', function () {
      cy.get('input[name="username"]').type('incorrectUsername')
      cy.get('input[name="password"]').type(`Dumbpassword{enter}`)
      cy.contains('Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')
    })
  })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login()
    })
    
    it('can create new blog', function () {
      cy.get('#showForm').click()
      cy.get('input[name="title"]').type('Title written by Cypress')
      cy.get('input[name="author"]').type('Test author')
      cy.get('input[name="url"]').type('www.wikipedia.org')
      cy.get('button[type="submit"]').click()
      cy.get('#blogList').contains('Title written by Cypress')
    })
    it('can display details of new blog', function () {
      cy.createBlog({ title: 'another cypress blog', author: 'somebody', url: 'www.cypress.com'})
      cy.get('#blogList').contains('another cypress blog').contains('show').click()
      cy.get('#blogList').contains('www.cypress.com')
      cy.get('#blogList').contains('likes 0')
    })
    it('can like a new blog', function () {
      cy.createBlog({ title: 'another cypress blog', author: 'somebody', url: 'www.cypress.com'})
      cy.get('#blogList').contains('another cypress blog').parent().parent().within(() => {
        cy.contains('show').click()
        cy.contains('likes').find('button').click()
        cy.contains('likes 1')
      })
      // cy.get('#blogList').contains('another cypress blog').parent().parent().as('theBlog')
      // cy.get('@theBlog').contains('show').click()
      // cy.get('@theBlog').contains('likes').find('button').click()
      // cy.get('@theBlog').contains('likes 1')
    })
    it('creator of a blog can delete it', function () {
      cy.createBlog({ title: 'another cypress blog', author: 'somebody', url: 'www.cypress.com'})
      cy.get('#blogList').contains('another cypress blog').parent().parent().within(() => {
        cy.contains('show').click()
        cy.contains('remove').click()
      })
      cy.get('html').should('not.contain', 'another cypress blog')
    })
    it('remove button is not displayed when not-creator is logged in', function () {
      cy.createBlog({ title: 'another cypress blog', author: 'somebody', url: 'www.xiaomi.com'})
      cy.contains('logout').click()
      cy.request('POST', `${baseApiUrl}/users`, { username: 'Hiki', name: 'Hikigaya', password: 'decristal' })
      cy.get('input[name="username"]').type('Hiki')
      cy.get('input[name="password"]').type(`decristal{enter}`)
      cy.get('#blogList').contains('another cypress blog').parent().as('wrongAuthor')
      cy.get('@wrongAuthor').contains('show').click()
      cy.get('@wrongAuthor').should('not.contain', 'remove')
    })
    it('blogs are ordered according to the number of likes', function () {
      cy.createBlog({ title: 'small amount of likes', author: 'GlaDOS', url: 'Aperture Laboratories', likes: 12 })
      cy.createBlog({ title: 'big amount of likes', author: 'GlaDOS', url: 'Aperture Laboratories', likes: 532 })
      cy.createBlog({ title: 'mediocore amount of likes', author: 'GlaDOS', url: 'Aperture Laboratories', likes: 35 })
      cy.createBlog({ title: 'vast amount of likes', author: 'GlaDOS', url: 'Aperture Laboratories', likes: 3534 })
      cy.get('.blogDiv').then((wholeBlogs) => {
        Cypress._.each(wholeBlogs, (blog) => {
          cy.wrap(blog).contains('show').click()
        })
        cy.wrap(wholeBlogs[0]).should('contain', 'likes 3534')
        cy.wrap(wholeBlogs[1]).should('contain', 'likes 532')
        cy.wrap(wholeBlogs[2]).should('contain', 'likes 35')
        cy.wrap(wholeBlogs[3]).should('contain', 'likes 12')
      })
    })
  })
})