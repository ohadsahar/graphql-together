import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { PostGraphQlService } from 'src/app/core/services/post-graphql.service';
import * as commentActions from '../actions/comment.action';


@Injectable()
export class CommentEffect {

  constructor(private action$: Actions, private postGraphQlService: PostGraphQlService) { }
  @Effect()
  public getCommentById$ = this.action$.pipe(ofType(commentActions.GET_COMMENTS_BY_ID))
    .pipe(switchMap((action: commentActions.GetCommentsById) => {
      return this.postGraphQlService.getPostCommentsById(action.payload)
        .pipe(map(data => new commentActions.GetCommentsByIdSuccess(data)),
          catchError(error => of(new commentActions.GetCommentByIdFailed(error)
          )));
    }));

  @Effect()
  public createComment$ = this.action$.pipe(ofType(commentActions.CREATE_COMMENT))
    .pipe(exhaustMap((action: commentActions.CreateComment) => {
      return this.postGraphQlService.createCommentOfPost(action.payload)
        .pipe(map(data => new commentActions.CreateCommentSuccess(data)),
          catchError(error => of(new commentActions.CreateCommentFailed(error)
          )));
    }));
}
