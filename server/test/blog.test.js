const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http');
const app = require('../bin/www')

chai.use(chaiHttp)

describe('GET ARTICLE from Blog', () => {
  it('should list ALL ARTICLE on /blogs {GET} ', (done) => {
    chai.request('http://localhost:3000')
      .get('/blogs')
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(200)
        expect(res.body.data_article[0]).to.have.property('title')
        expect(res.body.data_article[0]).to.have.property('text')
        expect(res.body.data_article[0].title).to.be.a('string')
        expect(res.body.data_article[0].text).to.be.a('string')
        done()
      })
  })
})

describe('CREATE ARTICLE /blogs from BLOGS', () => {
  it('should show created article on /blogs (POST)' , (done) => {
    chai.request('http://localhost:3000')
      .post('/blogs')
      .send({
        title: 'testing for creating blogs',
        text: 'content for testing creating blogs'
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res.body.data_article).to.have.property('title')
        expect(res.body.data_article).to.have.property('text')
        expect(res.body.data_article.title).to.be.a('string')
        expect(res.body.data_article.text).to.be.a('string')
        done()
      })
  })
})

describe('UPDATE SPECIFIC ARTICLE /blogs', () => {
  it('should edit specific Article on /blogs (PUT)', (done) => {
    chai.request('http://localhost:3000')
      .get('/blogs')
      .end((err,res) => {
        chai.request('http://localhost:3000')
        .put(`/blogs/${res.body.data_article[0]._id}`)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({title: 'testing update', text: 'content for testing update'})
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          console.log('hahaha',res.body);
          done()
        })
      })
  })
})

describe('DELETE SPECIFIC ARTICLE from /blogs', () => {
  it('should remove specific Article on /blogs (DELETE)', (done) => {
    chai.request('http://localhost:3000')
      .get('/blogs')
      .end((err, res) => {
        // console.log(res.body);
        chai.request('http://localhost:3000')
          .delete(`/blogs/${res.body.data_article[0]._id}`)
          .end((err, res) => {
            // console.log(res.body);
          })
        done()
      })
  })
})
