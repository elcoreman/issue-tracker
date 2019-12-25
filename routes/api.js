"use strict";

const expect = require("chai").expect;
const MongoClient = require("mongodb");
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_STRING = process.env.DB;

module.exports = app => {
  app
    .route("/api/issues/:project")

    .get((req, res) => {
      let project = req.params.project;
      let q = req.query;
      if (q._id) q._id = new ObjectId(q._id);
      if (q.open) q.open = String(q.open) == "true";
      MongoClient.connect(CONNECTION_STRING, (err, db) => {
        let collection = db.db("test1").collection(project);
        collection.find(q).toArray((err, docs) => res.json(docs));
      });
    })

    .post((req, res) => {
      let project = req.params.project;
      let issue = {
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_on: new Date(),
        updated_on: new Date(),
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to || "",
        open: true,
        status_text: req.body.status_text || ""
      };
      if (!issue.issue_title || !issue.issue_text || !issue.created_by) {
        res.send("missing inputs");
      } else {
        MongoClient.connect(CONNECTION_STRING, (err, db) => {
          let collection = db.db("test1").collection(project);
          collection.insertOne(issue, (err, doc) => {
            issue._id = doc.insertedId;
            res.json(issue);
          });
        });
      }
    })

    .put((req, res) => {
      let project = req.params.project;
      let issue = req.body._id;
      delete req.body._id;
      let updates = req.body;
      for (let ele in updates) if (!updates[ele]) delete updates[ele];
      if (updates.open) updates.open = String(updates.open) == "true";
      if (Object.keys(updates).length === 0) {
        res.send("no updated field sent");
      } else {
        updates.updated_on = new Date();
        MongoClient.connect(CONNECTION_STRING, (err, db) => {
          let collection = db.db("test1").collection(project);
          collection.findAndModify(
            { _id: new ObjectId(issue) },
            [["_id", 1]],
            { $set: updates },
            { new: true },
            (err, doc) => {
              !err
                ? res.send("successfully updated")
                : res.send("could not update " + issue + " " + err);
            }
          );
        });
      }
    })

    .delete((req, res) => {
      let project = req.params.project;
      let issue = req.body._id;
      if (!issue) {
        res.send("_id error");
      } else {
        MongoClient.connect(CONNECTION_STRING, (err, db) => {
          let collection = db.db("test1").collection(project);
          collection.findAndRemove({ _id: new ObjectId(issue) }, (err, doc) => {
            !err
              ? res.send("deleted " + issue)
              : res.send("could not delete " + issue + " " + err);
          });
        });
      }
    });
};
