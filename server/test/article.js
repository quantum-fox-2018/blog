const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const expect = chai.expect

chai.use(chaiHttp)

describe('Article', () => {
  describe('GET /articles', () => {
    it('successfully return list article', (done) => {
      chai.request(app)
        .get('/articles')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('Object')
          expect(res.body).to.ownProperty('message')
          expect(res.body).to.ownProperty('data')
          expect(res.body.message).to.be.an('String')
          expect(res.body.message).to.eql('success to access article page')
          expect(res.body.data).to.be.an('Array')
          done()
        })
    })
  })

  describe('POST /articles', () => {
    it('successfully add article', (done) => {
      chai.request(app)
        .post('/articles')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('Object')
          expect(res.body).to.ownProperty('message')
          expect(res.body).to.ownProperty('data')
          expect(res.body.message).to.be.an('String')
          expect(res.body.message).to.eql('success to add an article')
          expect(res.body.data).to.be.an('Object')
          done()
        })
    })
  })

  describe('PUT /articles', () => {
    it('successfully edit article', (done) => {
      chai.request(app)
        .put('/articles/5ad46ab5ca67d58e231ad99b')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('Object')
          expect(res.body).to.ownProperty('message')
          expect(res.body).to.ownProperty('data')
          expect(res.body.message).to.be.an('String')
          expect(res.body.message).to.eql('success to edit an article')
          expect(res.body.data).to.be.an('Object')
          done()
        })
    })
  })

  describe('DELETE /article', () => {
    it('successfully delete article', (done) => {
      chai.request(app)
        .del('/articles/5ad46ab5ca67d58e231ad99b')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('Object')
          expect(res.body).to.ownProperty('message')
          expect(res.body.message).to.be.an('String')
          expect(res.body.message).to.eql('success to delete an article')
          done()
        })
    })
  })
})