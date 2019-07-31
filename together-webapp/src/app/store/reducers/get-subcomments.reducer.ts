import * as subcommentsActions from '../actions/subcomment.action';

export interface State {
  data: any;
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = {
  data: [],
  loading: true,
  loaded: false
};

export function subCommentReducer(state = initialState, action: subcommentsActions.Actions) {
  switch (action.type) {
    case subcommentsActions.GET_ALL_SUBCOMMENTS:
      return {
        ...state,
        loading: true,
        loaded: false,
        data: action.payload
      };
    case subcommentsActions.GET_ALL_SUBCOMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case subcommentsActions.GET_ALL_SUBCOMMENTS_FAILED:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
  }
}
export const getSubCommentData = (state: State) => state;
