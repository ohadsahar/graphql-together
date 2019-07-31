import { Actions, Effect, ofType, } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { PostGraphQlService } from 'src/app/core/services/post-graphql.service';
import { of } from 'rxjs';
import * as postActions from '../actions/post.action';
import { catchError, exhaustMap, map } from 'rxjs/operators';


@Injectable()
export class PostEffects {
  constructor(private actions$: Actions, private postGrpahQlService: PostGraphQlService) { }
  @Effect()
  public allPosts$ = this.actions$.pipe(ofType(postActions.GET_ALL_POSTS))
    .pipe(exhaustMap(() => {
      return this.postGrpahQlService.getAllPost()
        .pipe(map(data => new postActions.GetAllPostsSuccess(data)),
          catchError(error => of(new postActions.GetAllPostsFailed(error)
          )));
    }));
  @Effect()
  public createPost$ = this.actions$.pipe(ofType(postActions.CREATE_POST))
    .pipe(exhaustMap((action: postActions.CreatePost) => {
      return this.postGrpahQlService.createPost(action.payload)
        .pipe(map(data => new postActions.CreatePostSuccess(data)),
          catchError(error => of(new postActions.CreatePostFailed(error)
          )));
    }));

  @Effect()
  public updatePost$ = this.actions$.pipe(ofType(postActions.UPDATE_POST))
    .pipe(exhaustMap((action: postActions.UpdatePost) => {
      return this.postGrpahQlService.updatePost(action.payload)
        .pipe(map(data => new postActions.UpdatePostSuccess(data)),
          catchError(error => of(new postActions.UpdatePostFailed(error)
          )));
    }));
}

