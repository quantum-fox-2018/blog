let mongoose = require("mongoose");
let Post = require('../models/post.model.js');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('test post', () => {
  describe('/GET posts', () => {
    it('it should GET all the posts', (done) => {
      chai.request(app)
          .get('/posts')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('data');
              res.body.data.should.be.an('array');
            done();
          });
    });
  });

  describe('/POST posts', () => {
    it('it should POST new post', (done) => {
      let post = {
        title: "New Post by Chai",
        content: "Content for post by chai"
      }

      chai.request(app)
          .post('/posts')
          .send(post)
          .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('data');
              res.body.data.should.have.property('_id');
              res.body.data.should.have.property('title');
              res.body.data.should.have.property('content');
              res.body.data.should.have.property('createdAt');
              res.body.data.should.have.property('updatedAt');
            done();
          })
    })
  })

  describe('/PUT/:id post', () => {
    it('it should UPDATE a post given the id', (done) => {
      let post = new Post({
        title: "New Post for update test by Chai",
        content: "Content for post by chai"
      })

      post.save((err, post) => {
        chai.request(app)
        .put('/posts/' + post.id)
        .send(post)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.data.should.have.property('_id');
            res.body.data.should.have.property('title');
            res.body.data.should.have.property('content');
            res.body.data.should.have.property('createdAt');
            res.body.data.should.have.property('updatedAt');
          done();
        });
      });
    });
  });

  describe('/DELETE/:id post', () => {
    it('it should DELETE a post given the id', (done) => {
      let post = new Post({
        title: "New Post for update test by Chai",
        content: "Content for post by chai"
      })
      
      post.save((err, post) => {
        chai.request(app)
        .delete('/posts/' + post.id)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            res.body.data.should.have.property('_id');
            res.body.data.should.have.property('title');
            res.body.data.should.have.property('content');
            res.body.data.should.have.property('createdAt');
            res.body.data.should.have.property('updatedAt');
          done();
        });
      });
    });
  });
})