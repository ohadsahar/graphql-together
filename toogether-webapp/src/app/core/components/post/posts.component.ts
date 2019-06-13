import { CommentClass } from './../../../shared/models/comment.model';
import { PostGraphQlService } from '../../services/post-graphql.service';
import { PostClass } from '../../../shared/models/post.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  post = new PostClass(null, '', '', '');
  comment = new CommentClass(null, '', '', '');
  public posts: PostClass[] = [];
  constructor(private postGraphQlService: PostGraphQlService) { }

  ngOnInit() {
    this.onLoadComponent();
  }

  onLoadComponent() {

    this.postGraphQlService.getAllPost().subscribe(response => {
      console.log(response);
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
      this.postGraphQlService.createRelationshipBetweenPostAndComments().subscribe(() => {
      });
    });
  }

}
