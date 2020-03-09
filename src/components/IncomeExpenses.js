import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(amount => amount > 0) //get positive amounts
    .reduce((acc, amount) => acc + amount, 0)
    .toFixed(2);

  const expense = (
    amounts
      .filter(amount => amount < 0) //get negative amounts
      .reduce((acc, amount) => acc + amount, 0) * -1
  ).toFixed(2);
  return (
    <>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <div className="money plus">+${income}</div>
        </div>
        <div>
          <h4>Expense</h4>
          <div className="money minus">-${expense}</div>
        </div>
      </div>
    </>
  );
};
