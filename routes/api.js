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
        //var project = req.params.project;
      db.issues.insert( { item: "card", qty: 15 } )

      })

      .put(function(req, res) {
        var project = req.params.project;
      })

      .delete(function(req, res) {
        var project = req.params.project;
      });
  });
};
