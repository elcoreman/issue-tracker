"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb");
var ObjectId = require("mongodb").ObjectID;

module.exports = function(app) {
  MongoClient.connect(process.env.DB, function(err, client) {
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
  });
};
