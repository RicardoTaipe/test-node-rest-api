const mongoose = require("mongoose");
let User = require("../models/user");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);

describe("Users", () => {
  beforeEach(done => {
    //Before each test we empty the database
    User.deleteMany({}, err => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET user", () => {
    it("it should GET all the users", done => {
      chai
        .request(server)
        .get("/user")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  /*
   * Test the /POST route
   */
  describe("/POST user", () => {
    it("it should POST a user ", done => {
      let user = {
        name: "Schylar D. Zimmermann",
        age: 42,
        occupation: "Anesthetist"
      };
      chai
        .request(server)
        .post("/user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("User successfully added!");
          res.body.user.should.have.property("name");
          res.body.user.should.have.property("age");
          res.body.user.should.have.property("occupation");
          done();
        });
    });
  });
  /*
   * Test GET/:id user
   */
  describe("GET/:id user", () => {
    it("it should GET a user by a given id", done => {
      let user = new User({
        name: "Schylar D. Zimmermann",
        age: 42,
        occupation: "Anesthetist"
      });
      user.save((err, user) => {
        chai
          .request(server)
          .get("/user/" + user.id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("name");
            res.body.should.have.property("age");
            res.body.should.have.property("occupation");
            res.body.should.have.property("_id").eql(user.id);
            done();
          });
      });
    });
  });
  /*
   * Test PUT/:id user
   */
  describe("/PUT/:id user", () => {
    it("it should UPDATE a user given the id", done => {
      let user = new User({
        name: "Schylar D. Zimmermann",
        age: 42,
        occupation: "Anesthetist"
      });
      user.save((err, user) => {
        chai
          .request(server)
          .put("/user/" + user.id)
          .send({
            name: "Schylar D. Zimmermann",
            age: 50,
            occupation: "Anesthetist"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("User updated!");
            res.body.user.should.have.property("age").eql(50);
            done();
          });
      });
    });
  });
  /*
   * Test DELETE/:id user
   */
  describe("/DELETE/:id user", () => {
    it("it should DELETE a user given the id", done => {
      let user = new User({
        name: "Schylar D. Zimmermann",
        age: 42,
        occupation: "Anesthetist"
      });
      user.save((err, user) => {
        chai
          .request(server)
          .delete("/user/" + user.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("User successfully deleted!");
            res.body.result.should.have.property("ok").eql(1);
            res.body.result.should.have.property("n").eql(1);
            done();
          });
      });
    });
  });
});
