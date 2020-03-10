const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const transactionsSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      required: [true, 'Please add some text'],
    },
    amount: {
      type: String,
      trim: true,
      required: [true, 'Please enter positive or negative number'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Transaction', transactionsSchema);
