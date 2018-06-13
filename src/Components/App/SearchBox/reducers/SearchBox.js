import ActionTypes from 'Components/App/SearchBox/actionTypes';

const defaultState = {
  isLoading: false,
  err: null,
  results: [],
};

export default function searchWord(state = defaultState, action) {
  const {
    type, isLoading, err, results,
  } = action;
  switch (type) {
    case ActionTypes.SEARCH_WORD_REQUEST:
      return {
        ...state,
        isLoading,
      };
    case ActionTypes.SEARCH_WORD_SUCCESS:
      return {
        ...state,
        isLoading,
        results,
      };
    case ActionTypes.SEARCH_WORD_FAILURE:
      return {
        ...state,
        isLoading,
        err,
      };
    default:
      return state;
  }
}
