import * as postActions from '../actions/post.action';

export interface State {
  data: any;
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  data: [],
  loading: true,
  loaded: false
};

export function postReducer(state = initialState, action: postActions.Actions) {

  switch (action.type) {
    case postActions.GET_ALL_POSTS:
      return {
        ...state,
        loading: true,
        loaded: false,
        data: action.payload
      };
    case postActions.GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case postActions.GET_ALL_POSTS_FAILED:
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

export const getPostDataReducer = (state: State) => state;

