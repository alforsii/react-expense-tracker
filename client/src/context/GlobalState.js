import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

//Initial state
const initialState = {
  transactions: [
    // { id: 1, text: 'Flower', amount: -20 },
    // { id: 2, text: 'Salary', amount: 300 },
    // { id: 3, text: 'Book', amount: -10 },
    // { id: 4, text: 'Camera', amount: 150 },
  ],
  error: null,
  loading: true,
};

//Create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
  const [state, callAppReducer] = useReducer(AppReducer, initialState);

  //-------------actions ---------------
  //=-=-=-=-=-==-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=
  //all transactions
  //=-=-=-=-=-==-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=
  function getTransactions() {
    axios
      .get('/transactions')
      .then(resFromDB => {
        // console.log('resFromDB', resFromDB.data.transactions);
        callAppReducer({
          callType: 'GET_TRANSACTIONS',
          data: resFromDB.data.transactions,
        });
      })
      .catch(err => {
        callAppReducer({
          callType: 'TRANSACTION_ERROR',
          data: err.response.data.error,
        });
      });
  }
  //=-=-=-=-=-==-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=
  //delete
  //=-=-=-=-=-==-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=
  function deleteTransaction(id) {
    axios
      .post(`/transactions/${id}`)
      .then(resFromDB => {
        // console.log('resFromDB', resFromDB.data.transactions);
        callAppReducer({
          callType: 'DELETE_TRANSACTION',
          data: id,
        });
      })
      .catch(err => {
        callAppReducer({
          callType: 'TRANSACTION_ERROR',
          data: err.response.data.error,
        });
      });
  }
  //=-=-=-=-=-==-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=
  //add
  //=-=-=-=-=-==-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=
  function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios
      .post('/transactions', transaction, config)
      .then(resFromDB => {
        // console.log('resFromDB', resFromDB.data.transactions);
        callAppReducer({
          callType: 'ADD_TRANSACTION',
          data: resFromDB.data.transactions,
        });
      })
      .catch(err => {
        callAppReducer({
          callType: 'TRANSACTION_ERROR',
          data: err.response.data.error,
        });
      });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
