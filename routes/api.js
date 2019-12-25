"use strict";

var expect = require("chai").expect;
var MongoClient = require("mongodb");
var ObjectId = require("mongodb").ObjectID;

module.exports = function(app) {
  MongoClient.connect(process.env.DB, function(err, client) {
    if (err) console.log("Database error: " + err);
    console.log("Successful database connection");
    const db = client.db("test");
    app
      .route("/api/issues/:project")

      .get(function(req, res) {
        res.json({ xxx: "get" });
        var project = req.params.project;
        console.log("get");
      })

      .post(function(req, res) {
        res.json({ xxx: "post" });
        var project = req.params.project;
        console.log("post");
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
        res.json({ xxx: "put" });
        var project = req.params.project;
        console.log("put");
      })

      .delete(function(req, res) {
        res.json({ xxx: "delete" });
        var project = req.params.project;
        console.log("delete");
      });
  });
};
