import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { PostGraphQlService } from 'src/app/core/services/post-graphql.service';
import * as subcommentActions from '../actions/subcomment.action';

@Injectable()

export class SubcommentEffects {
  constructor(private actions$: Actions, private postGraphQlService: PostGraphQlService) { }

  @Effect()
  public getSubcomments$ = this.actions$.pipe(ofType(subcommentActions.GET_ALL_SUBCOMMENTS))
    .pipe(switchMap((action: subcommentActions.GetAllSubcomments) => {
      return this.postGraphQlService.getSubCommentsByCommentId(action.payload)
        .pipe(map(data => new subcommentActions.GetAllSubCommentsSuccess(data)),
          catchError(error => of(new subcommentActions.GetAllSubCommentsFailed(error)
          )));
    }));

  @Effect()
  public createSubComments$ = this.actions$.pipe(ofType(subcommentActions.CREATE_SUBCOMMENT))
    .pipe(exhaustMap((action: subcommentActions.CreateSubcomment) => {
      return this.postGraphQlService.createSubCommentOfComment(action.payload)
        .pipe(map(data => new subcommentActions.CreateSubCommentSuccess(data)),
          catchError(error => of(new subcommentActions.CreateSubCommentFailed(error)
          )));
    }));
}
