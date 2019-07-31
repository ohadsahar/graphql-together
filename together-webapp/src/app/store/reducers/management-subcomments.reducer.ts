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

export function subcommentManagementReducer(state = initialState, action: subcommentsActions.Actions) {

  switch (action.type) {
    case subcommentsActions.CREATE_SUBCOMMENT:
      return {
        ...state,
        loading: true,
        loaded: false,
        data: action.payload
      };
    case subcommentsActions.CREATE_SUBCOMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case subcommentsActions.CREATE_SUBCOMMENT_FAILED:
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
export const getSubcommentManagementReducerData = (state: State) => state;
