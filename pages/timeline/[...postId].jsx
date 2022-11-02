import { useRouter } from "next/router";

const SinglePostWithComments = () => {
  const router = useRouter();
  console.log(router);
  // all posts by user, ensure to add a callback to signIn to redirect back here after login if unauthenticated user wants to comment

  return <div>UserPosts</div>;
};
export default SinglePostWithComments;