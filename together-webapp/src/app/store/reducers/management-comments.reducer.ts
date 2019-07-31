import * as commentAction from '../actions/comment.action';

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

export function commentManagementReducer(state = initialState, action: commentAction.Actions) {
  switch (action.type) {
    case commentAction.CREATE_COMMENT:
      return {
        ...state,
        loading: true,
        loaded: false,
        data: action.payload
      };
    case commentAction.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case commentAction.CREATE_COMMENT_FAILED:
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
export const getCommentManagementData = (state: State) => state;
