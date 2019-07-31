import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as postReducer from './store/reducers/get-posts.reducer';
import * as managementPostReducer from './store/reducers/management-posts.reducer';

export interface State {
  postReducer: postReducer.State;
  managementPostReducer: managementPostReducer.State;
}

export const Reducers: ActionReducerMap<State> = {
  postReducer: postReducer.postReducer,
  managementPostReducer: managementPostReducer.managementPostsReducer
};

export const getPostReducer = createFeatureSelector<postReducer.State>('postReducer');
export const getPostManagementReducer = createFeatureSelector<managementPostReducer.State>('managementPostReducer');

export const getPostData = createSelector(getPostReducer, postReducer.getPostDataReducer);
export const getPostManagementData = createSelector(getPostManagementReducer, managementPostReducer.getManagementReducerData);
