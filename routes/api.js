"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb");
var ObjectId = require("mongodb").ObjectID;

MongoClient.connect(process.env.DB, function(err, client) {
  module.exports = function(app) {
    if (err) console.log("Database error: " + err);
    console.log("Successful database connection");
    const db = client.db("test");
    app
      .route("/api/issues/:project")

      .get(function(req, res) {
        var project = req.params.project;
      })

      .post(function(req, res) {
        var project = req.params.project;
        db.issues.insert({
          issue_title: req.body.issue_title,
          issue_text: req.body.issue_text,
          created_by: req.body.created_by,
          assigned_to: req.body.assigned_to,
          status_text: req.body.status_text
        });
      })

      .put(function(req, res) {
        var project = req.params.project;
      })

      .delete(function(req, res) {
        var project = req.params.project;
      });
  }
});
