import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as fromRoot from '../../../app.reducer';
import { PostClass } from '../../../shared/models/post.model';
import { SubCommentClass } from '../../../shared/models/subcomment.model';
import * as postActions from '../../../store/actions/post.action';
import * as commentActions from '../../../store/actions/comment.action';
import * as subcommentActions from '../../../store/actions/subcomment.action';
import { PostGraphQlService } from '../../services/post-graphql.service';
import { CommentClass } from './../../../shared/models/comment.model';
import { FetchCommentsInterface } from './../../../shared/models/fetch-comments-by-id.model';
import { WebSocketService } from './../../services/web-socket.service';
import { Subscription } from 'apollo-angular';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit, OnDestroy {
  public showOrHideComments: any = {};
  public showOrHideSubComments: any = {};
  public isLoading: boolean;
  post = new PostClass(null, '', '', '', 0);
  comment = new CommentClass(null, '', '', '');
  subcomment = new SubCommentClass(null, '', '', '');
  fetchCommentData: FetchCommentsInterface;
  fetchSubCommentData: FetchCommentsInterface;
  getMoreComments: Subscription;
  public posts: PostClass[] = [];
  public comments: any[] = [];
  public subcomments: SubCommentClass[] = [];
  currentPostid: string;
  currentCommentid: string;
  currentPost: number;
  limit: number;
  skip: number;
  limitSubComment: number;
  skipSubComment: number;

  ngbSubscribe$: Subject<void> = new Subject<void>();


  constructor(private postGraphQlService: PostGraphQlService, private spinnerService: Ng4LoadingSpinnerService,
    private webSocketService: WebSocketService, private store: Store<fromRoot.State>
  ) {
    this.isLoading = false;
    this.skip = 0;
    this.limit = 5;
    this.limitSubComment = 5;
    this.skipSubComment = 0;
  }

  ngOnInit() {
    this.onLoadComponent();
    this.startSocketing();
  }
  onLoadComponent() {
    this.loading();
    this.store.dispatch(new postActions.GetAllPosts());
    const dataSubscribed = this.store.select(fromRoot.getPostData).pipe(takeUntil(this.ngbSubscribe$))
      .subscribe((postData) => {
        if (postData.loaded) {
          this.posts = postData.data.data.getAllPosts;
          dataSubscribed.unsubscribe();
          this.loaded();
        }
      });
  }
  startSocketing() {
    this.webSocketService.listen('post created').subscribe((postData) => {
      this.posts.push(postData.message.post);
    });
    this.webSocketService.listen('sub comment created').subscribe((subcommentData) => {
      this.subcomments.push(subcommentData.message.subcomment);
    });
    this.webSocketService.listen('liked-post').subscribe((postLikedData) => {
      this.posts[this.currentPost] = postLikedData.message.post;
    })
    this.webSocketService.listen('new comment').subscribe((commentData) => {
      if (this.comments[this.currentPost]) {
        this.comments[this.currentPost] = this.comments[this.currentPost].concat(commentData.message.comment);
      }
    });
  }
  /* Posts section */
  createNewPost() {
    this.loading();
    this.store.dispatch(new postActions.CreatePost(this.post));
    const dataSubscribed = this.store.select(fromRoot.getPostManagementData).pipe(takeUntil(this.ngbSubscribe$))
      .subscribe((postCreatedData) => {
        if (postCreatedData.loaded) {
          const data = { post: postCreatedData.data.data.createPost };
          this.webSocketService.emit('create post', data);
          dataSubscribed.unsubscribe();
          this.loaded();
        }
      });
  }
  likePost(postData: PostClass, index: number, value: boolean) {
    this.loading();
    this.currentPost = index;
    if (value) {
      postData.likes += 1;
    } else {
      postData.likes -= 1;
    }
    this.loading();
    this.store.dispatch(new postActions.UpdatePost(postData));
    const dataSubscribed = this.store.select(fromRoot.getPostManagementData).pipe(takeUntil(this.ngbSubscribe$))
      .subscribe((postUpdatedData) => {
        if (postUpdatedData.loaded) {
          const data = { post: postUpdatedData.data.data.updatePost };
          this.webSocketService.emit('like-post', data);
          this.posts[index] = data.post;
          dataSubscribed.unsubscribe();
          this.loaded();
        }
      });
  }
  /* Posts section */

  /* Comments section */
  createNewComment(form: NgForm, i: number, postid: string) {
    if (form.invalid) {
      return;
    }
    this.loading();
    this.currentPost = i;
    this.isLoading = true;
    this.comment.postid = postid;
    this.comment.username = 'shalom hanoh';
    this.comment.commentdata = form.value.commentdata;
    this.store.dispatch(new commentActions.CreateComment(this.comment));
    const dataSubscribed = this.store.select(fromRoot.getCommentManagementData).pipe(takeUntil(this.ngbSubscribe$))
      .subscribe((createdCommentData) => {
        if (createdCommentData.loaded) {
          const data = { comment: createdCommentData.data.data.createComment };
          this.webSocketService.emit('create-comment', data);
          this.postGraphQlService.createRelationshipBetweenPostAndComments().subscribe(() => {
            dataSubscribed.unsubscribe();
            this.loaded();
          });
        }
      });
  }
  getCommentsByPostId(postid: string, i: number) {
    this.loading();
    this.currentPost = i;
    this.currentPostid = postid;
    this.fetchCommentData = { limit: this.limit, skip: this.skip, postid };
    this.store.dispatch(new commentActions.GetCommentsById(this.fetchCommentData));
    const dataSubscribed = this.store.select(fromRoot.getCommentData).pipe(takeUntil(this.ngbSubscribe$))
      .subscribe((commentsData) => {
        if (commentsData.loaded) {
          if (this.comments[this.currentPost]) {
            this.comments[this.currentPost] = this.comments[this.currentPost].concat(commentsData.data.data.getAllComentsByPostId);
          } else {
            this.comments[this.currentPost] = commentsData.data.data.getAllComentsByPostId;
          }
          this.loaded();
          dataSubscribed.unsubscribe();
        }
      });
  }
  /* Comments section */

  /* SubComments section */
  createNewSubComment(commentid: string) {
    this.loading();
    this.subcomment.commentid = commentid;
    this.subcomment.username = 'idan sagron';
    this.store.dispatch(new subcommentActions.CreateSubcomment(this.subcomment));
    const dataSubscribed = this.store.select(fromRoot.getSubCommentManagementData).pipe(takeUntil(this.ngbSubscribe$))
      .subscribe((createdSubComment) => {
        if (createdSubComment.loaded) {
          const data = { subcomment: createdSubComment.data.data.createSubComment };
          this.webSocketService.emit('create-sub-comment', data);
          this.postGraphQlService.createSubCommentToCommentRelationship().subscribe(() => {
            this.loaded();
            dataSubscribed.unsubscribe();
          });
        }
      });
  }
  showSubComments(commentid: string) {
    this.loading();
    this.currentCommentid = commentid;
    this.fetchSubCommentData = { limit: this.limitSubComment, skip: this.skipSubComment, postid: commentid };
    this.store.dispatch(new subcommentActions.GetAllSubcomments(this.fetchSubCommentData));
    const dataSubscribed = this.store.select(fromRoot.getSubCommentData).pipe(takeUntil(this.ngbSubscribe$))
      .subscribe((subCommentData) => {
        if (subCommentData.loaded) {
          if (this.subcomments) {
            this.subcomments = this.subcomments.concat(subCommentData.data.data.getSubCommentsByCommentID);
          } else {
            this.subcomments = subCommentData.data.data.getSubCommentsByCommentID;
          }
          this.loaded();
          dataSubscribed.unsubscribe();
        }
      });
  }
  /* SubComments section */

  /* Paginator section */
  updateSkipLimit() {
    this.limit += 5;
    this.skip += 5;
    this.getCommentsByPostId(this.currentPostid, this.currentPost);
  }
  updateSkipLimitSubComments() {
    this.limitSubComment += 5;
    this.skipSubComment += 5;
    this.showSubComments(this.currentCommentid);
  }
  resetComments() {
    this.comments[this.currentPost] = [];
    this.skip = 0;
    this.limit = 5;
  }
  resetSubComments() {
    this.subcomments = [];
    this.limitSubComment = 5;
    this.skipSubComment = 0;
  }
  /* Paginator section */
  changePanel(postid: string) {
    this.resetSubComments();
    this.showSubComments(postid);
  }
  /* Loading section */
  loading() {
    this.isLoading = true;
    this.spinnerService.show();
  }
  loaded() {
    this.isLoading = false;
    this.spinnerService.hide();
  }
  /* Loading section */
  ngOnDestroy() {
    this.ngbSubscribe$.complete();
    this.ngbSubscribe$.unsubscribe();
  }
}
