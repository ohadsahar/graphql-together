import { Action } from '@ngrx/store';
export const GET_ALL_SUBCOMMENTS = 'GET_ALL_SUBCOMMENTS';
export const GET_ALL_SUBCOMMENTS_SUCCESS = 'GET_ALL_SUBCOMMENTS_SUCCESS';
export const GET_ALL_SUBCOMMENTS_FAILED = 'GET_ALL_SUBCOMMENTS_FAILED';

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

export type Actions = GetAllSubcomments | GetAllSubCommentsSuccess | GetAllSubCommentsFailed;
