var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  suite("POST /api/issues/{project} => object with issue data", function() {
    test("Every field filled in", function(done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_title: "Title",
          issue_text: "text",
          created_by: "Functional Test - Every field filled in",
          assigned_to: "Chai and Mocha",
          status_text: "In QA"
        })
        .end(function(err, res) {
          let body = JSON.stringify(res.body);
          assert.equal(res.status, 200);
          assert.equal(body.issue_title, "Title");
          assert.equal(body.issue_text, "text");
          assert.equal(
            body.created_by,
            "Functional Test - Every field filled in"
          );
          assert.equal(body.assigned_to, "Chai and Mocha");
          assert.equal(body.status_text, "In QA");
          done();
        });
    });

    test("Required fields filled in", function(done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_title: "Title",
          issue_text: "text",
          created_by: "Functional Test - Every field filled in",
          assigned_to: "",
          status_text: ""
        })
        .end(function(err, res) {
          let body = JSON.stringify(res.body);
          assert.equal(res.status, 200);
          assert.equal(body.issue_title, "Title");
          assert.equal(body.issue_text, "text");
          assert.equal(
            body.created_by,
            "Functional Test - Every field filled in"
          );
          assert.equal(body.assigned_to, "");
          assert.equal(body.status_text, "");
          done();
        });
    });

    test("Missing required fields", function(done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_title: "",
          issue_text: "",
          created_by: "",
          assigned_to: "Chai and Mocha",
          status_text: "In QA"
        })
        .end(function(err, res) {
          let body = JSON.stringify(res.body);
          assert.equal(res.status, 200);
          assert.equal(body, "missing inputs");
          done();
        });
    });
  });

  suite("PUT /api/issues/{project} => text", function() {
    test("No body", function(done) {});

    test("One field to update", function(done) {});

    test("Multiple fields to update", function(done) {});
  });

  suite(
    "GET /api/issues/{project} => Array of objects with issue data",
    function() {
      test("No filter", function(done) {
        chai
          .request(server)
          .get("/api/issues/test")
          .query({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "issue_title");
            assert.property(res.body[0], "issue_text");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "updated_on");
            assert.property(res.body[0], "created_by");
            assert.property(res.body[0], "assigned_to");
            assert.property(res.body[0], "open");
            assert.property(res.body[0], "status_text");
            assert.property(res.body[0], "_id");
            done();
          });
      });

      test("One filter", function(done) {});

      test("Multiple filters (test for multiple fields you know will be in the db for a return)", function(done) {});
    }
  );

  suite("DELETE /api/issues/{project} => text", function() {
    test("No _id", function(done) {});

    test("Valid _id", function(done) {});
  });
});
