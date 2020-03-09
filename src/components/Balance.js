import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amount = transactions.map(transaction => transaction.amount);
  console.log(' amount', amount);
  const total = amount.reduce((acc, val) => acc + val, 0).toFixed(2);
  // const total = transactions
  //   .reduce((acc, val) => acc + val.amount, transactions[0].amount)
  //   .toFixed(2);

  return (
    <div>
      <h4>Your Balance</h4>
      <h1>${total}</h1>
    </div>
  );
};
