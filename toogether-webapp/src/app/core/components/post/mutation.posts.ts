
import gql from 'graphql-tag';
import { PostClass } from 'src/app/shared/models/post.model';
import { CommentClass } from 'src/app/shared/models/comment.model';

export function createPost(postData: PostClass) {
  return gql`
  mutation {
    createPost(username: "${postData.username}", postitle: "${postData.postitle}", postext: "${postData.postext}") {
      id,
      username,
      postitle,
      postext
    }
  }`;
}

export function createComment(commentData: CommentClass) {
  return gql`
  mutation {
    createComment(postid: "${commentData.postid}", username: "${commentData.username}", commentdata: "${commentData.commentdata}") {
      id,
      postid,
      username,
      commentdata
    }
  }`;
}

export function createRelationshipCommentToPost() {
  return gql`
    mutation {
      createReleationCommentToPost {
        id
      }
    }`;
}
