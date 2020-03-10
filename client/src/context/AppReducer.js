export default (state, action) => {
  //state and actions comes from GlobalState.js
  // console.log('Output for: action.callType', action.data);
  switch (action.callType) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.data,
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction._id !== action.data
        ),
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.data],
      };
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.data,
      };
    default:
      return state;
  }
};
