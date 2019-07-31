import { Action } from '@ngrx/store';
export const GET_ALL_SUBCOMMENTS = 'GET_ALL_SUBCOMMENTS';
export const GET_ALL_SUBCOMMENTS_SUCCESS = 'GET_ALL_SUBCOMMENTS_SUCCESS';
export const GET_ALL_SUBCOMMENTS_FAILED = 'GET_ALL_SUBCOMMENTS_FAILED';
export const CREATE_SUBCOMMENT = 'CREATE_SUBCOMMENT';
export const CREATE_SUBCOMMENT_SUCCESS = 'CREATE_SUBCOMMENT_SUCCESS';
export const CREATE_SUBCOMMENT_FAILED = 'CREATE_SUBCOMMENT_FAILED';

export class GetAllSubcomments implements Action {
  readonly type = GET_ALL_SUBCOMMENTS;
  constructor(public payload: any) { }
}

export class GetAllSubCommentsSuccess implements Action {
  readonly type = GET_ALL_SUBCOMMENTS_SUCCESS;
  constructor(public payload: any) { }
}

export class GetAllSubCommentsFailed implements Action {
  readonly type = GET_ALL_SUBCOMMENTS_FAILED;
  constructor(public payload: any) { }
}
export class CreateSubcomment implements Action {
  readonly type = CREATE_SUBCOMMENT;
  constructor(public payload: any) { }
}

export class CreateSubCommentSuccess implements Action {
  readonly type = CREATE_SUBCOMMENT_SUCCESS;
  constructor(public payload: any) {}
}
export class CreateSubCommentFailed implements Action {
  readonly type = CREATE_SUBCOMMENT_FAILED;
  constructor(public payload: any) { }
}

export type Actions = GetAllSubcomments | GetAllSubCommentsSuccess | GetAllSubCommentsFailed | CreateSubcomment | CreateSubCommentSuccess
  | CreateSubCommentFailed;
