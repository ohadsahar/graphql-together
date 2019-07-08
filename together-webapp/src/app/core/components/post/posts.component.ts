import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostClass } from '../../../shared/models/post.model';
import { SubCommentClass } from '../../../shared/models/subcomment.model';
import { PostGraphQlService } from '../../services/post-graphql.service';
import { CommentClass } from './../../../shared/models/comment.model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {
  // define variables
  public showOrHideComments: any = {};
  public showOrHideSubComments: any = {};
  public isLoading: boolean;

  // using models for the order
  post = new PostClass(null, '', '', '');
  comment = new CommentClass(null, '', '', '');
  subcomment = new SubCommentClass(null, '', '', '');

  // array to keep the data from neo4j database
  public posts: PostClass[] = [];
  public comments: CommentClass[] = [];
  public subcomments: SubCommentClass[] = [];

  constructor(
    private postGraphQlService: PostGraphQlService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.onLoadComponent();
  }
  onLoadComponent() {
    this.loading();
    this.spinnerService.show();
    this.postGraphQlService.getAllPost().subscribe(response => {
      this.posts = response.data.getAllPosts;
      this.loaded();
    });
  }
  createNewPost() {
    this.isLoading = true;
    this.post.username = 'Ohad sahar';
    this.postGraphQlService.createPost(this.post).subscribe(response => {
      this.posts.push(response.data.createPost);
      this.isLoading = false;
    });
  }
  createNewComment(form: NgForm,i: number, postid: string) {

    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.comment.postid = postid;
    this.comment.username = 'Noy ditchi';
    this.comment.commentdata = form.value.commentdata;
    this.postGraphQlService.createCommentOfPost(this.comment).subscribe(response => {
      this.comments.push(response.data.createComment);
      this.postGraphQlService.createRelationshipBetweenPostAndComments().subscribe(() => {
        this.loaded();
      });
    });
  }
  createNewSubComment(commentid: string) {
    this.loading();
    this.subcomment.commentid = commentid;
    this.subcomment.username = 'idan sagron';
    this.postGraphQlService
      .createSubCommentOfComment(this.subcomment)
      .subscribe(response => {
        this.subcomments.push(response.data.createSubComment);
        this.postGraphQlService
          .createSubCommentToCommentRelationship()
          .subscribe(() => {
            this.loaded();
          });
      });
  }
  showSubComments(commentid: string) {
    this.loading();
    this.postGraphQlService
      .getSubCommentsByCommentId(commentid)
      .subscribe(response => {
        this.subcomments = response.data.getSubCommentsByCommentID;
        this.loaded();
      });
  }
  getCommentsByPostId(postid: string, i: number) {
    this.loading();
    this.postGraphQlService.getPostCommentsById(postid).subscribe(response => {
      this.comments[i] = response.data.getAllComentsByPostId;
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
