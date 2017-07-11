const Todo = require('../models/todo');

function getAll(req, res) {
  Todo.find({}, function(err, response) {
    if (err) res.send(err);
    else res.send(response)
  })
}

function getOne(req, res) {
  Todo.findOne({
    _id: req.params.id
  }, function(err, response) {
    if (err) res.send(err);
    else res.send(response)
  })
}

function getByUser(req, res) {
  Todo.find({
    userId: req.params.userId
  }, function(err, response) {
    if (err) res.send(err)
    else res.send(response)
  })
}

function create(req, res) {
  Todo.create({
    title: req.body.title,
    desc: req.body.desc,
    userId: req.body.userId,
    isDone: false,
    createdAt: new Date(),
    doneTarget: new Date(req.body.doneDate)
  }, function(err, response) {
    if (err) res.send(err);
    else res.send(response)
  })
}

function update(req, res) {
  Todo.findOneAndUpdate({
    _id: req.params.id
  }, {
    title: req.body.title,
    desc: req.body.desc,
    isDone: req.body.isDone,
    doneTarget: new Date(req.body.doneDate)
  }, function(err, response) {
    if (err) res.send(err);
    else res.send("berhasil")
  })
}

function deleteOne(req, res) {
  Todo.remove({
    _id: req.params.id
  }, function(err, response) {
    if (err) res.send(err);
    else res.send(response)
  })
}

module.exports = {
  getAll,
  getOne,
  getByUser,
  create,
  update,
  deleteOne
}
