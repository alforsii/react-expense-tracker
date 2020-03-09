export default (state, action) => {
  //state and actions comes from GlobalState.js
  switch (action.callType) {
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.idOrObj
        ),
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.idOrObj, ...state.transactions],
      };
    default:
      return state;
  }
};
