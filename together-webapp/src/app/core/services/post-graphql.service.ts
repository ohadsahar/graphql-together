import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { PostClass } from 'src/app/shared/models/post.model';
import * as mutation from '../components/post/mutation.posts';
import * as query from '../components/post/query.posts';
import { CommentClass } from 'src/app/shared/models/comment.model';
import { SubCommentClass } from '../../shared/models/subcomment.model';

@Injectable({providedIn: 'root'})
export class PostGraphQlService {

  constructor(private apollo: Apollo) {}
  createPost(postData: PostClass) {
    return this.apollo.mutate<any>({mutation: mutation.createPost(postData)});
  }
  createCommentOfPost(commentData: CommentClass) {
    return this.apollo.mutate<any>({mutation: mutation.createComment(commentData)});
  }
  createSubCommentOfComment(subCommentData: SubCommentClass) {
    return this.apollo.mutate<any>({mutation: mutation.createSubComment(subCommentData)});
  }
  createSubCommentToCommentRelationship() {
    return this.apollo.mutate<any>({mutation: mutation.createRelationshipSubCommentToComment()});
  }
  createRelationshipBetweenPostAndComments() {
    return this.apollo.mutate<any>({mutation: mutation.createRelationshipCommentToPost()});
  }
  getAllPost() {
    return this.apollo.watchQuery<any>({query: query.getAllPosts()}).valueChanges;
  }
  getPostCommentsById(postid: string){
    return this.apollo.watchQuery<any>({query: query.getAllComentsByPostId(postid)}).valueChanges;
  }
  getSubCommentsByCommentId(commentid: string) {
    return this.apollo.watchQuery<any>({query: query.getSubCommentsByCommentID(commentid)}).valueChanges;
  }

}
