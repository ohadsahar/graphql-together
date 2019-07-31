import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as postReducer from './store/reducers/get-posts.reducer';
import * as commentReducer from './store/reducers/get-comments.reducer';
import * as subcommentReducer from './store/reducers/get-subcomments.reducer';
import * as managementCommentReducer from './store/reducers/management-comments.reducer';
import * as managementPostReducer from './store/reducers/management-posts.reducer';
export interface State {
  postReducer: postReducer.State;
  commentReducer: commentReducer.State;
  subcommentReducer: subcommentReducer.State;
  managementPostReducer: managementPostReducer.State;
  managementCommentReducer: managementCommentReducer.State;
}

export const Reducers: ActionReducerMap<State> = {
  postReducer: postReducer.postReducer,
  commentReducer: commentReducer.getCommentsReducer,
  managementPostReducer: managementPostReducer.managementPostsReducer,
  managementCommentReducer: managementCommentReducer.commentManagementReducer,
  subcommentReducer: subcommentReducer.subCommentReducer
};

export const getPostReducer = createFeatureSelector<postReducer.State>('postReducer');
export const getPostManagementReducer = createFeatureSelector<managementPostReducer.State>('managementPostReducer');
export const getCommentReducer = createFeatureSelector<commentReducer.State>('commentReducer');
export const getCommentManagementReducer = createFeatureSelector<managementCommentReducer.State>('managementCommentReducer');
export const getSubCommentReducer = createFeatureSelector<subcommentReducer.State>('subcommentReducer');


export const getPostData = createSelector(getPostReducer, postReducer.getPostDataReducer);
export const getPostManagementData = createSelector(getPostManagementReducer, managementPostReducer.getManagementReducerData);
export const getCommentData = createSelector(getCommentReducer, commentReducer.getCommentReducerData);
export const getCommentManagementData = createSelector(getCommentManagementReducer, managementCommentReducer.getCommentManagementData);
export const getSubCommentData = createSelector(getSubCommentReducer, subcommentReducer.getSubCommentData);
