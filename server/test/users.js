const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const server = require('../app')

chai.use(chaiHttp)

describe('Users', () => {
  it('expect to register user', (done) => {
    chai.request(server)
    .post('/users/register')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      name: 'Cecha',
      email: 'cecha@mail.com',
      password: '1234'
    })
    .end((err, res) => {
      expect(res.status).to.equal(201)
      expect(res.body.data).to.have.property('name')
      expect(res.body.data).to.have.property('email')
      expect(res.body.data).to.have.property('password')
      done()
    })
  })
  it('expect to login user', (done) => {
    chai.request(server)
    .post('/users/login')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      email: 'cecha@mail.com',
      password: '1234'
    })
    .end((err, res) => {
      expect(res.status).to.equal(200)
      done()
    })
  })
})