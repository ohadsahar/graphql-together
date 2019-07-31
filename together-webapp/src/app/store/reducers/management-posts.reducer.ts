import * as postActions from '../actions/post.action';

export interface State {
  data: any;
  loading: boolean;
  loaded: boolean;
}

const initialState: State = {
  loading: true,
  loaded: false,
  data: []
};

export function managementPostsReducer(state = initialState, action: postActions.Actions) {
  switch (action.type) {
    case postActions.CREATE_POST:
      return {
        ...state,
        loading: true,
        loaded: false,
        data: action.payload
      };
    case postActions.CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case postActions.CREATE_POST_FAILED:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case postActions.UPDATE_POST:
      return {
        ...state,
        loading: true,
        loaded: false,
        data: action.payload
      };
    case postActions.UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case postActions.UPDATE_POST_FAILED:
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

export const getManagementReducerData = (state: State) => state;
