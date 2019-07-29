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
  currentPost: number;
  post = new PostClass(null, '', '', '');
  comment = new CommentClass(null, '', '', '');
  subcomment = new SubCommentClass(null, '', '', '');
  public posts: PostClass[] = [];
  public comments: any[] = [];
  public subcomments: SubCommentClass[] = [];

  constructor(private postGraphQlService: PostGraphQlService, private spinnerService: Ng4LoadingSpinnerService,
              private webSocketService: WebSocketService
  ) {
    this.isLoading = false;
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
      const data = { post: this.post };
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
    this.postGraphQlService.getSubCommentsByCommentId(commentid).subscribe(response => {
      this.subcomments = response.data.getSubCommentsByCommentID;
      this.loaded();
    });
  }
  getCommentsByPostId(postid: string, i: number) {
    this.loading();
    this.currentPost = i;
    this.postGraphQlService.getPostCommentsById(postid).subscribe(response => {
      this.comments[this.currentPost] = response.data.getAllComentsByPostId;
      this.loaded();
    });
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
