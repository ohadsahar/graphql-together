import { Action } from '@ngrx/store'

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_ALL_POSTS_SUCCESS = 'GET_ALL_POSTS_SUCCESS';
export const GET_ALL_POSTS_FAILED = 'GET_ALL_POSTS_FAILED';
export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILED = 'CREATE_POST_FAILED';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILED = 'UPDATE_POST_FAILED';

export class GetAllPosts implements Action {
  readonly type = GET_ALL_POSTS;
  constructor(public payload: any) { }
}

export class GetAllPostsSuccess implements Action {
  readonly type = GET_ALL_POSTS_SUCCESS;
  constructor(public payload: any) { }
}

export class GetAllPostsFailed implements Action {
  readonly type = GET_ALL_POSTS_FAILED;
  constructor(public payload: any) { }
}

export class CreatePost implements Action {
  readonly type = CREATE_POST;
  constructor(public payload: any) { }
}

export class CreatePostSuccess implements Action {
  readonly type = CREATE_POST_SUCCESS;
  constructor(public payload: any) { }
}

export class CreatePostFailed implements Action {
  readonly type = CREATE_POST_FAILED;
  constructor(public payload: any) { }
}

export class UpdatePost implements Action {
  readonly type = UPDATE_POST;
  constructor(public payload: any) { }
}

export class UpdatePostSuccess implements Action {
  readonly type = UPDATE_POST_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdatePostFailed implements Action {
  readonly type = UPDATE_POST_FAILED;
  constructor(public payload: any) { }
}

export type Actions = GetAllPosts | GetAllPostsSuccess | GetAllPostsFailed | CreatePost | CreatePostSuccess | CreatePostFailed
  | UpdatePost | UpdatePostSuccess | UpdatePostFailed;
