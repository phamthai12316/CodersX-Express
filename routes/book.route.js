var express = require('express');

var bookController = require('../controllers/book.controller');

var router = express.Router();

router.get('/', bookController.index);

router.get('/search', bookController.search);

router.get('/create', bookController.create);

router.post('/create', bookController.postCreate);

router.get('/:id', bookController.view);

router.get('/:id/delete', bookController.delete);

router.get('/:id/update', bookController.update);

router.post('/:id/update', bookController.postUpdate)

module.exports = router