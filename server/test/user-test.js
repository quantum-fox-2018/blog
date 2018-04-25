const chai = require('chai')
    ,expect = chai.expect
    ,chaiHttp = require('chai-http')
    ,url = 'http://localhost:4000/users'


chai.use(chaiHttp)

describe('REGISTER USER', () => {
    it('should be create new user', (done) => {
        chai.request(url)
        .post('/register')
        .send({
            first_name: 'User',
            last_name: 'Kedua',
            email: 'user3@example.com',
            password: 'user1234'
        })
        .end((err, res) => {
            console.log('===MASUUUUK',res.body)
            expect(res).to.have.status(200)
            expect(res.body.message).to.be.a('string')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data.email).to.be.a('string')
            expect(res.body.data.email).to.equal('user3@example.com')
            done()
        })
    })
})

describe('LOGIN USER', () => {
    it('should be create user login', (done) => {
        chai.request(url)
        .post('/login')
        .send({
            email: 'user3@example.com',
            password: 'user1234'
        })
        .end((err, res) => {
            console.log('===MASUUUUK',res.body)
            expect(res).to.have.status(200)
            expect(res.body.message).to.be.a('string')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data.email).to.be.a('string')
            expect(res.body.data.email).to.equal('user3@example.com')
            done()
        })
    })
})