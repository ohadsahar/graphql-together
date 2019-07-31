import { Action } from '@ngrx/store';
export const GET_COMMENTS_BY_ID = 'GET_COMMENTS_BY_ID';
export const GET_COMMENTS_BY_ID_SUCCESS = 'GET_COMMENTS_BY_ID_SUCCESS';
export const GET_COMMENTS_BY_ID_FAILED = 'GET_COMMENTS_BY_ID_FAILED';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILED = 'CREATE_COMMENT_FAILED';

export class GetCommentsById implements Action {
  readonly type = GET_COMMENTS_BY_ID;
  constructor(public payload: any) { }
}

export class GetCommentsByIdSuccess implements Action {
  readonly type = GET_COMMENTS_BY_ID_SUCCESS;
  constructor(public payload: any) { }
}

export class GetCommentByIdFailed implements Action {
  readonly type = GET_COMMENTS_BY_ID_FAILED;
  constructor(public payload: any) { }
}

export class CreateComment implements Action {
  readonly type = CREATE_COMMENT;
  constructor(public payload: any) { }
}

export class CreateCommentSuccess implements Action {
  readonly type = CREATE_COMMENT_SUCCESS;
  constructor(public payload: any) { }
}

export class CreateCommentFailed implements Action {
  readonly type = CREATE_COMMENT_FAILED;
  constructor(public payload: any) { }
}

export type Actions = GetCommentsById | GetCommentsByIdSuccess | GetCommentByIdFailed
  | CreateComment | CreateCommentSuccess | CreateCommentFailed;
