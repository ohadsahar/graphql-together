import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostClass } from '../../../shared/models/post.model';
import { PostGraphQlService } from '../../services/post-graphql.service';
import { CommentClass } from './../../../shared/models/comment.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {

  post = new PostClass(null, '', '', '');
  comment = new CommentClass(null, '', '', '');
  public showOrHideComments: any = {};
  public posts: PostClass[] = [];
  public comments: CommentClass[] = [];
  constructor(private postGraphQlService: PostGraphQlService) {

  }

  ngOnInit() {
    this.onLoadComponent();
  }
  onLoadComponent() {

    this.postGraphQlService.getAllPost().subscribe(response => {
      this.posts = response.data.getAllPosts;
    });
  }
  createNewPost() {
    this.post.username = 'Ohad sahar';
    this.postGraphQlService.createPost(this.post).subscribe(response => {
      this.posts.push(response.data.createPost);
    });
  }
  createNewComment(postid: string) {
    this.comment.postid = postid;
    this.comment.username = 'Noy ditchi';
    this.postGraphQlService.createCommentOfPost(this.comment).subscribe(response => {
      this.comments.push(response.data.createComment);
      this.postGraphQlService.createRelationshipBetweenPostAndComments().subscribe(() => {
      });
    });
  }
  getCommentsByPostId(postid: string) {
    this.postGraphQlService.getPostCommentsById(postid).subscribe(response => {
      this.comments = response.data.getAllComentsByPostId;
    });
  }

}
