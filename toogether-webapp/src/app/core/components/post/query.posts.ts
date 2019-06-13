import gql from 'graphql-tag';

export function getAllPosts() {
  return gql`
    query {
      getAllPosts {
        id,
        username,
        postitle,
        postext
      }
       {
        id,
        postid,
        commentdata
      }
    }`;
}
