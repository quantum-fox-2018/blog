const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const expect = chai.expect

chai.use(chaiHttp)

describe('Homepage', () => {
  describe('GET /', () => {
    it('successfully return homepage', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('Object')
          expect(res.body).to.ownProperty('message')
          expect(res.body.message).to.be.an('String')
          expect(res.body.message).to.eql('success to homepage')
          done()
        })
    })
  })
})


