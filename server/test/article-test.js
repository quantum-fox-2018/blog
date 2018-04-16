const chai = require('chai')
    ,expect = chai.expect
    ,chaiHttp = require('chai-http')
    ,url = 'http://localhost:4000/articles'


chai.use(chaiHttp)


describe('READ ARTICLE', () => {
    it('should be return all article in collection', (done) => {
        chai.request(url)
        .get('/find')
        .send({userId: '101'})
        .end((err, res) => {
            console.log(res.body)
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
            title: 'Belajar TDD Mocha Chai',
            article_content: 'Mari belajar TDD dengan Mocha Chai JS',
            userId: '101'
        })
        .end((err, res) => {
            console.log('===MASUUUUK',res.body)
            expect(res).to.have.status(200)
            expect(res.body.message).to.be.a('string')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data.title).to.be.a('string')
            expect(res.body.data.title).to.equal('Belajar TDD Mocha Chai')
            done()
        })
    })
})


describe('DELETE ARTICLE', () => {
    it('should be delete article by id', (done) => {
        chai.request(url)
        .delete('/delete/5ad476061972994ad8706963')
        .end((err, res) => {
            console.log('===MASUUUUK',res.body)
            expect(res).to.have.status(200)
            expect(res.body.message).to.be.a('string')
            expect(res.body.data).to.be.a('null')
            // expect(res.body.data.title).to.be.a('string')
            done()
        })
    })
})

describe('UPDATE ARTICLE', () => {
    it('should be update article by id', (done) => {
        chai.request(url)
        .put('/update/5ad4753ca4c894499faf23f0')
        .send({
            title: 'Belajar TDD Mocha Chai',
            article_content: 'Mari belajar Vue JavaScipt Lagi'
        })
        .end((err, res) => {
            console.log('===MASUUUUK',res.body)
            expect(res).to.have.status(200)
            expect(res.body.message).to.be.a('string')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data.title).to.be.a('string')
            expect(res.body.data.article_content).to.be.a('string')
            expect(res.body.data.title).to.equal('Belajar TDD Mocha Chai')
            done()
        })
    })
})