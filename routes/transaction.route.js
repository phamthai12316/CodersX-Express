var express = require('express');

var transactionController = require('../controllers/transaction.controller');

var router = express.Router();

router.get('/', transactionController.index);

router.get('/create', transactionController.create);

router.post('/create', transactionController.postCreate);

router.get('/:id/complete', transactionController.complete);

module.exports = router