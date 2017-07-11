var express = require('express');
var router = express.Router();
const userCont = require('../controllers/userController');
const toDoCont = require('../controllers/toDoController');

/* GET home page. */
router.get('/users', userCont.getAll)
router.get('/users/:id', userCont.getOne)
router.post('/users/login', userCont.login)
router.post('/users/verify-token', userCont.verifyToken)
router.post('/users', userCont.create)
router.put('/users/:id', userCont.update)
router.delete('/users/:id', userCont.deleteOne)

router.get('/todos', toDoCont.getAll)
router.get('/todos/:id', toDoCont.getOne)
router.get('/todos/user/:userId', toDoCont.getByUser)
router.post('/todos', toDoCont.create)
router.put('/todos/:id', toDoCont.update)
router.delete('/todos/:id', toDoCont.deleteOne)


module.exports = router;
