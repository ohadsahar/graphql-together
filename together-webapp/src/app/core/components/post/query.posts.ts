import { FetchCommentsInterface } from './../../../shared/models/fetch-comments-by-id.model';
import gql from 'graphql-tag';
export function getAllPosts() {
  return gql`
    query {
      getAllPosts {
        id
        username
        postitle
        postext,
        likes
      }
    }
  `;
}
export function getSubCommentsByCommentID(fetchSubCommentData: FetchCommentsInterface) {
  return gql`
    query {
      getSubCommentsByCommentID(first:${fetchSubCommentData.limit},offset:${fetchSubCommentData.skip},
      commentid: "${fetchSubCommentData.postid}") {
        id,
        commentid,
        username,
        subcommentdata
      }
    }`;
}
export function getAllComentsByPostId(fetchComment: FetchCommentsInterface) {
  return gql`
  query {
    getAllComentsByPostId(first:${fetchComment.limit},offset:${fetchComment.skip}, postid:"${fetchComment.postid}") {
      id,
      postid,
      username,
      commentdata
    }
  }`;
}
