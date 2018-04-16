const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)

describe('test blog api', () => {
  describe('post new article', () => {
    it('show posted article', (done) => {
      chai.request(app)
          .post('/api/post/add')
          .type('form')
          .send({
            _method: 'post',
            post_title: 'Post Title',
            post_content: 'Lorem ipsum dolor sit amet'
          })
          .end( (err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body.data).to.have.property('post_title')
            expect(res.body.data).to.have.property('post_content')
            done()
          })
    })

  })
})