import { FetchCommentsInterface } from './../../../shared/models/fetch-comments-by-id.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PostClass } from '../../../shared/models/post.model';
import { SubCommentClass } from '../../../shared/models/subcomment.model';
import { PostGraphQlService } from '../../services/post-graphql.service';
import { CommentClass } from './../../../shared/models/comment.model';
import { WebSocketService } from './../../services/web-socket.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {
  public showOrHideComments: any = {};
  public showOrHideSubComments: any = {};
  public isLoading: boolean;
  post = new PostClass(null, '', '', '');
  comment = new CommentClass(null, '', '', '');
  subcomment = new SubCommentClass(null, '', '', '');
  fetchCommentData: FetchCommentsInterface;
  fetchSubCommentData: FetchCommentsInterface;
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

  constructor(private postGraphQlService: PostGraphQlService, private spinnerService: Ng4LoadingSpinnerService,
    private webSocketService: WebSocketService
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
    this.spinnerService.show();
    this.postGraphQlService.getAllPost().subscribe(response => {
      this.posts = response.data.getAllPosts;
      this.loaded();
    });
  }
  startSocketing() {
    this.webSocketService.listen('post created').subscribe((postData) => {
      this.posts.push(postData.message.post);
    });
    this.webSocketService.listen('new comment').subscribe((commentData) => {
      if (this.comments[this.currentPost]) {
        this.comments[this.currentPost] = this.comments[this.currentPost].concat(commentData.message.comment);
      }
    });
    this.webSocketService.listen('sub comment created').subscribe((subcommentData) => {
      this.subcomments.push(subcommentData.message.subcomment);
    });
  }
  createNewPost() {
    this.isLoading = true;
    this.post.username = 'Ohad sahar';
    this.postGraphQlService.createPost(this.post).subscribe(response => {
      const data = { post: response.data.createPost };
      this.webSocketService.emit('create post', data);
      this.isLoading = false;
    });
  }
  createNewComment(form: NgForm, i: number, postid: string) {
    if (form.invalid) {
      return;
    }
    this.currentPost = i;
    this.isLoading = true;
    this.comment.postid = postid;
    this.comment.username = 'shalom hanoh';
    this.comment.commentdata = form.value.commentdata;
    this.postGraphQlService.createCommentOfPost(this.comment).subscribe(response => {
      const data = { comment: response.data.createComment };
      this.webSocketService.emit('create-comment', data);
      this.postGraphQlService.createRelationshipBetweenPostAndComments().subscribe(() => {
        this.loaded();
      });
    });
  }
  createNewSubComment(commentid: string) {
    this.loading();
    this.subcomment.commentid = commentid;
    this.subcomment.username = 'idan sagron';
    this.postGraphQlService.createSubCommentOfComment(this.subcomment).subscribe(response => {
      const data = { subcomment: response.data.createSubComment };
      this.webSocketService.emit('create-sub-comment', data);
      this.postGraphQlService.createSubCommentToCommentRelationship().subscribe(() => {
        this.loaded();
      });
    });
  }
  showSubComments(commentid: string) {
    this.loading();
    this.currentCommentid = commentid;
    this.fetchSubCommentData = { limit: this.limitSubComment, skip: this.skipSubComment, postid: commentid };
    this.postGraphQlService.getSubCommentsByCommentId(this.fetchSubCommentData).subscribe(response => {
      if (this.subcomments) {
        this.subcomments = this.subcomments.concat(response.data.getSubCommentsByCommentID);
      } else {
        this.subcomments = response.data.getSubCommentsByCommentID;
      }
      this.loaded();
    });
  }
  getCommentsByPostId(postid: string, i: number) {
    this.loading();
    this.currentPost = i;
    this.currentPostid = postid;
    this.fetchCommentData = { limit: this.limit, skip: this.skip, postid };
    this.postGraphQlService.getPostCommentsById(this.fetchCommentData).subscribe(response => {
      if (this.comments[this.currentPost]) {
        this.comments[this.currentPost] = this.comments[this.currentPost].concat(response.data.getAllComentsByPostId);
      } else {
        this.comments[this.currentPost] = response.data.getAllComentsByPostId;
      }
      this.loaded();
    });
  }
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
  loading() {
    this.isLoading = true;
    this.spinnerService.show();
  }
  loaded() {
    this.isLoading = false;
    this.spinnerService.hide();
  }
}
