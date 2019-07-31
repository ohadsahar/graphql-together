import * as commentActions from '../actions/comment.action';

export interface State {
  data: any;
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  data: [],
  loading: true,
  loaded: false,
};

export function getCommentsReducer(state = initialState, action: commentActions.Actions) {
  switch (action.type) {
    case commentActions.GET_COMMENTS_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        data: action.payload
      };
    case commentActions.GET_COMMENTS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case commentActions.GET_COMMENTS_BY_ID_FAILED:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    default:
      return state;
  }
}

export const getCommentReducerData = (state: State) => state;

