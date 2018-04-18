const chai = require('chai')
const chaihttp = require('chai-http');

chai.use(chaihttp)

const expect = chai.expect
const server = 'http://localhost:3000/artikels'
describe ('api artikels', () => {

  let dumy = {
    title: 'blog irsyadd',
    content: 'perjalanan hidup'
  }
  describe ('GET artikels', () => {
    it ('untuk menampilkan response artikel', done => {
      chai.request(server).get('/showartikels').end((err,res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('Object')
        expect(res.body.message).to.be.a('String').equals('show artikel succes')
        expect(res.body.data).to.be.an('array')
        done()
      })
    })
  }),

  describe ('POST artikels', () => {
    it ('untuk menambah data artikel', done => {
      chai.request(server)
      .post('/addartikel')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYzNkNjI2MzRlODA2MzEwYzFiYmU2MSIsInVzZXJuYW1lIjoiYSIsImVtYWlsIjoiYSIsImlhdCI6MTUyMzg1OTg4Nn0.oYr92iAXHFCja67JPDGSP0IDjKTaBZhHn_tuvMKNgYo')
      .send(dumy)
      .end((req,res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('Object')
        expect(res.body.message).to.be.a('String').equals('add artikel succes')
        expect(res.body.data).to.be.an('object')
        done()
      })
    })
  }),

  describe ('PUT artikels', () => {
    it ('untuk mengedit file artikel', done => {
      chai.request(server)
      .put('/updateartikel/5ad466315cc893279bfad060')
      .send({
        title: "gue edit title lo",
        content: 'langsung aje content lu gue dit juga'
      })
      .end((req,res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('Object')
        expect(res.body.message).to.be.a('String').equals('update artikel succes')
        expect(res.body.data).to.be.an('object')
        done()
      })
    })
  }),

  describe ('Delete artikels', () => {
    it ('untuk ngedelete file artikel', done => {
      chai.request(server)
      .delete('/deleteartikels/5ad467b96d85102860f1d15c')
      .end((req,res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('Object')
        expect(res.body.message).to.be.a('String').equals('delete artikel success')
        expect(res.body.data).to.be.an('object')
        done()
      })
    })
  })


})
