const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const server = require('../app')

chai.use(chaiHttp)

describe('CRUD Article', () => {
  it('expect to list all article', (done) => {
    chai.request(server)
    .get('/articles')
    .end((err, res) => {
      expect(res.status).to.equal(200)
      done()
    })
  })
  it('expect to add article', (done) => {
    chai.request(server)
    .post('/articles')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      title: 'Title Article example',
      text: 'Text article example'
    })
    .end((err, res) => {
      expect(res.status).to.equal(201)
      expect(res.body.data).to.have.property('title')
      expect(res.body.data).to.have.property('text')
      expect(res.body.data.title).to.be.a('string')
      expect(res.body.data.text).to.be.a('string')
      done()
    })
  })
  it('expect to update article', (done) => {
    chai.request(server)
    .put('/articles/5ad45073850a5416097a2a9d')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      title: 'Title Updated',
      text: 'Text updated'
    })
    .end((err, res) => {
      expect(res.status).to.equal(201)
      done()
    })
  })
  it('expect to delete article', (done) => {
    chai.request(server)
    .delete('/articles/5ad45073850a5416097a2a9d')
    .end((err, res) => {
      expect(res.status).to.equal(200)
      done()
    })
  })
})