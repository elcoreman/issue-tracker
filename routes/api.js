"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb");
var ObjectId = require("mongodb").ObjectID;

module.exports = function(app) {
  MongoClient.connect(process.env.DB, function(err, client) {
    if (err) console.log("Database error: " + err);
    console.log("Successful database connection");
    var db = client.db("test");
    app
      .route("/api/issues/:project")

      .get(function(req, res) {
        var project = req.params.project;
        res.redirect("/aaa");
      })

      .post(function(req, res) {
        res.redirect("/bbb");
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
            if (err) {
              console.log("error", err);
              res.redirect("/api/issues/" + project);
            }
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
            res.redirect("/");
          }
        );
      })

      .put(function(req, res) {
        res.redirect("/ccc");
        var project = req.params.project;
      })

      .delete(function(req, res) {
        res.redirect("/ddd");
        var project = req.params.project;
      });
  });
};
