const User = require('../models/user');
const bcrypt = require('bcrypt');
var saltRounds = 10;
const jwt = require('jsonwebtoken');

function getAll(req, res) {
  User.find({}, function(err, response) {
    if (err) res.send(err);
    else res.send(response)
  })
}

function getOne(req, res) {
  User.findOne({
    _id: req.params.id
  }, function(err, response) {
    if (err) res.send(err);
    else res.send(response)
  })
}

function login(req, res) {
  User.find({
    username: req.body.username
  }, function(err, response) {
    if (err) res.send(err)
    else {
        if (response.length == 0) {
          res.send("failUsername")
        } else {
          if (bcrypt.compareSync(req.body.password, response[0].password)) {
            let token = jwt.sign({
              name: response[0].name,
              username: response[0].username,
              userId: response[0]._id
            }, "todo-fancy")
            let kiriman = {
              token: token,
              name: response[0].name
            }
            res.send(kiriman)
          } else {
            res.send("failPassword")
          }
        }
    }
  })
}

function create(req, res) {
  let hash = bcrypt.hashSync(req.body.password, saltRounds)
  console.log(hash);
  User.find({
    username: req.body.username
  }, function(err, response) {
    if (response.length > 0) {
      res.send("failUsername")
    } else {
      User.create({
        username: req.body.username,
        name: req.body.name,
        password: hash
      }, function(err, rezponse) {
        if (err) {
          console.log(err);
          res.send("error")
        } else {
          res.send(rezponse)
        }
      })
    }
  })
}

function update(req, res) {
  let hash = bcrypt.hashSync(req.body.password, saltRounds)
  User.findOneAndUpdate({
    _id: req.params.id
  }, {
    name: req.body.name,
    password: hash
  }, function(err, response) {
    if (err) console.log(err);
    else res.send(response)
  })
}

function deleteOne(req, res) {
  User.remove({
    _id: req.params.id
  }, function(err, response) {
    if (err) console.log(err);
    else res.send(response)
  })
}

function verifyToken(req, res) {
  let token = jwt.verify(req.body.token, "todo-fancy")
  res.send(token)
}

module.exports = {
  getAll,
  getOne,
  login,
  create,
  update,
  deleteOne,
  verifyToken
}
