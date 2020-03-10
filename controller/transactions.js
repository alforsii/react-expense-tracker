const Transaction = require('../models/Transaction.model');

exports.getTransactions = (req, res, next) => {
  //   res.send('Get transactions');
  Transaction.find()
    .then(transactionsFromDB => {
      res.status(200).json({
        status: 200,
        success: true,
        count: transactionsFromDB.length,
        transactions: transactionsFromDB,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        success: false,
        error: 'Server Error',
      });
    });
};
exports.addTransactions = (req, res, next) => {
  //   res.send('Get transactions');
  Transaction.create(req.body)
    .then(createdTransaction => {
      res.status(200).json({
        status: 200,
        success: true,
        transactions: createdTransaction,
      });
    })
    .catch(err => {
      //   console.log('err', err);
      if (err.name === 'ValidationError') {
        const errMessages = Object.values(err.errors).map(err => err.message);

        res.status(400).json({
          //400 client error
          status: 400,
          success: false,
          error: errMessages,
        });
      } else {
        res.status(500).json({
          //mongo error
          status: 500,
          success: false,
          error: 'Server Error',
        });
      }
    });
};
exports.deleteTransactions = (req, res, next) => {
  //   res.send('Get transactions');
  const { id } = req.params;
  Transaction.findByIdAndDelete(id)
    .then(deletedTransaction => {
      res.status(200).json({
        status: 200,
        success: true,
        deleted: deletedTransaction,
        transactions: {},
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        success: false,
        error: 'Server Error',
      });
    });
};
