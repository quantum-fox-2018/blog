const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const should = chai.should()
const server = require('../bin/www')

describe('user API', function () {
  describe('POST/users/signup', function () {
    it('make sure user signup success', function (done) {
      chai.request(server)
      .post('/users/signup')
      .send({
        'name': 'test',
        'email': 'test@nih.com',
        'password': 'test'
      })
      .end(function (err, res) {
        console.log(res.body)
        res.should.have.status(201)
        res.body.message.should.be.a('string').equal('success adding new user')
        res.body.newUser.name.should.be.a('string').equal('test')
        done()
      })
    })
  })

  describe('POST/users/signin', function () {
    it('make sure user signin success', function (done) {
      chai.request(server)
      .post('/users/signin')
      .send({
        'email': 'test@nih.com',
        'password': 'test'
      })
      .end(function (err, res) {
        res.should.have.status(200)
        res.body.message.should.be.a('string').equal('login success')
        done()
      })
    })
  })
})