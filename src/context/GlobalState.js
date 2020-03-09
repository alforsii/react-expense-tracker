import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

//Initial state
const initialState = {
  transactions: [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: 150 },
  ],
};

//Create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
  const [state, callAppReducer] = useReducer(AppReducer, initialState);

  //-------------actions ---------------
  //delete
  function deleteTransaction(id) {
    callAppReducer({
      callType: 'DELETE_TRANSACTION',
      idOrObj: id,
    });
  }
  //add
  function addTransaction(transaction) {
    callAppReducer({
      callType: 'ADD_TRANSACTION',
      idOrObj: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
