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
        db.collection("issues").insertOne(
          {
            issue_title: req.body.issue_title,
            issue_text: req.body.issue_text,
            created_by: req.body.created_by,
            assigned_to: req.body.assigned_to,
            status_text: req.body.status_text
          },
          (err, res) => {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
          }
        );
      })

      .put(function(req, res) {
        var project = req.params.project;
      })

      .delete(function(req, res) {
        var project = req.params.project;
      });
  };
});
