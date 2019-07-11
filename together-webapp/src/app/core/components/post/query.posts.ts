import gql from 'graphql-tag';
export function getAllPosts() {
  return gql`
    query {
      getAllPosts {
        id
        username
        postitle
        postext
      }
    }
  `;
}
export function getSubCommentsByCommentID(commentid: string) {
  return gql`
    query {
      getSubCommentsByCommentID(commentid: "${commentid}") {
        id,
        commentid,
        username,
        subcommentdata
      }
    }`;
}
export function getAllComentsByPostId(first: number, offset: number, postid: string) {
  return gql`
  query {
    getAllComentsByPostId(first:${first},offset:${offset}, postid:"${postid}") {
      id,
      postid,
      username,
      commentdata
    }
  }`;
}
