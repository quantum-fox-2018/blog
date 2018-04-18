const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const expect = chai.expect

chai.use(chaiHttp)

describe('User', () => {
  describe('POST /users/signin', () => {
    it('successfully login', (done) => {
      chai.request(app)
        .post('/users/signin')
        .type('form')
        .send({email: 'wikanyaa@gmail.com',password: 'wika2727'})
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('Object')
          expect(res.body).to.ownProperty('message')
          expect(res.body).to.ownProperty('token')
          expect(res.body.message).to.be.an('String')
          expect(res.body.message).to.eql('success login')
          expect(res.body.token).to.be.an('String')
          done()
        })
    })
  })
})