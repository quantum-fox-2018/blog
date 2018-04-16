const chai = require('chai')
    ,expect = chai.expect
    ,chaiHttp = require('chai-http')
    ,url = 'http://localhost:4000/articles'


chai.use(chaiHttp)


describe('READ ARTICLE', () => {
    it('should be return all article in collection', (done) => {
        chai.request(url)
        .get('/find')
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body.message).to.be.a('string')
            expect(res.body.data).to.be.an('array')
            done()
        })
    })
})


describe('CREATE ARTICLE', () => {
    it('should be create new article', (done) => {
        chai.request(url)
        .post('/create')
        .send({
            title: 'Belajar Vue JS',
            article_content: 'Mari belajar Vue JavaScipt'
        })
        .end((err, res) => {
            console.log('===MASUUUUK',res.body)
            expect(res).to.have.status(200)
            expect(res.body.message).to.be.a('string')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data.title).to.be.a('string')
            expect(res.body.data.title).to.equal('Belajar Vue JS')
            done()
        })
    })
})