const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)

describe('test blog api', () => {
  describe('show all posted article', () => {
    it('should show all posted article', (done) => {
      chai.request(app)
          .get('/api/post/find')
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.ownProperty('message').to.equal('Show all Post')
            expect(res.body).to.ownProperty('data').to.be.an('array')
            done()
          })
    })
  })

  describe('post new article', () => {
    it('should show posted article', (done) => {
      chai.request(app)
          .post('/api/post/add')
          .type('form')
          .send({
            post_title: 'Post Title',
            post_content: 'Lorem ipsum dolor sit amet'
          })
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.ownProperty('message').to.equal('Post new article success')
            expect(res.body).to.ownProperty('data').to.be.a('object')
            expect(res.body.data).to.ownProperty('post_title').to.be.a('string')
            expect(res.body.data).to.ownProperty('post_content').to.be.a('string')
            done()
          })
    })
  })

  describe('update article by ID', () => {
    it('should show updated article', (done) => {
      chai.request(app)
          .get('/api/post/find')
          .end((err, res) => {
            chai.request(app)
                .put(`/api/post/update/${res.body.data[4]._id}`)
                .type('form')
                .send({
                  post_title: 'New Post Title',
                  post_content: 'New lorem ipsum dolor sit amet'
                })
                .end((err, res) => {
                  expect(err).to.be.null
                  expect(res).to.have.status(200)
                  expect(res.body).to.ownProperty('message').to.equal('Update article success')
                  expect(res.body).to.ownProperty('data').to.be.a('object')
                  expect(res.body.data).to.ownProperty('post_title').to.be.a('string')
                  expect(res.body.data).to.ownProperty('post_content').to.be.a('string')
                  done()
                })
          })
    })
  })

  describe('delete article by ID', () => {
    it('should delete one article by ID', (done) => {
      chai.request(app)
          .get('/api/post/find')
          .end((err, res) => {
            chai.request(app)
                .delete(`/api/post/delete/${res.body.data[4]._id}`)
                .end((err, res) => {
                  expect(err).to.be.null
                  expect(res).to.have.status(200)
                  expect(res.body).to.ownProperty('message').to.equal('Delete article success')
                  expect(res.body).to.ownProperty('data').to.be.a('object')
                  done()
                })
          })
    })
  })
})