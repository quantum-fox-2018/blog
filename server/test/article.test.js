const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const should = chai.should()
const server = require('../bin/www')

describe('article API', function () {
  describe('POST/articles', function () {
    it('make sure article successfully saved', (done) => {
      chai.request(server)
      .post('/articles')
      .set('userid','5ad4502c41d3002795a8076f')
      .send({
        'title': 'How to control water level beginner',
        'content': 'Control water require water soul and water spirit'
      })
      .end((err, res) => {
        console.log('res boody', res.body)
        res.should.have.status(201)
        res.body.message.should.be.a('string').equal('success adding new article!')
        res.body.should.be.an('object')
        res.body.newArticle.title.should.be.equal('How to control water level beginner')
        done()
      })
    })
  })

  describe('GET/articles',function () {
    it('make sure article that added appear on the article lists', (done) => {
      chai.request(server)
      .get('/articles')
      .end((err, res) => {
        // console.log(res.body)
        res.should.have.status(200)
        res.body.message.should.be.a('string').equal('success get all list')
        res.body.should.be.an('object')
        res.body.listArticle.should.be.an('array')
        done()
      })
    })
  })

  describe('PUT/articles/:id', function () {
    it('make sure article can be editted', (done) => {
      chai.request(server)
      .put('/articles/:id')
      .send({
        title: 'mastering bootsrap 4',
        content: 'you will mastering bootstrap 4 in an hour witj this book'
      })
      .end((err, res) => {
        console.log(res.body)
        res.should.have.status(200)
        res.body.message.should.be.a('string').equal('success edit an article!')
        res.body.should.be.an('object')
        done()
      })
    })
  })

  describe('DELETE/articles/:id', function () {
    it('make sure article can be deleted', (done) => {
      chai.request(server)
      .delete('/articles/:id')
      .end((err, res) => {
        console.log(res.body)
        res.should.have.status(200)
        res.body.message.should.be.a('string').equal('success remove an article!')
        // res.body.deletedArticle._id.should.be.equal('5ad443d3d4d7b01f05c4c6e0')
        done()
      })
    })
  })

})