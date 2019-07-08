
import gql from 'graphql-tag';
import { PostClass } from 'src/app/shared/models/post.model';
import { CommentClass } from 'src/app/shared/models/comment.model';
import { SubCommentClass } from 'src/app/shared/models/subcomment.model';

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
export function createSubComment(subCommentData: SubCommentClass) {
  return gql`
    mutation {
      createSubComment(commentid: "${subCommentData.commentid}",
      username: "${subCommentData.username}", subcommentdata: "${subCommentData.subcommentdata}") {
        id,
        commentid,
        username,
        subcommentdata
      }
    }`;
}
export function createRelationshipSubCommentToComment() {
  return gql`
  mutation {
    createSubCommentToCommentRelationship {
      id
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
