import { useMemo, useRef } from "react";
import { UsersPost } from "./usersPost";
import useLazyLoad from "../../components/useLazyLoad";

const reducerInGroupOfThree = (accum, post) => {
  if (!accum.length || accum[accum.length - 1].length === 3) {
    const newGroup = [];
    newGroup.push(post);
    accum.push(newGroup);
  } else {
    accum[accum.length - 1].push(post);
  }
  return accum;
};

export const UsersPostsContainer = ({
  user,
  user: { posts },
  modalPost,
  setModalPost,
}) => {
  const groupedUserPosts = useMemo(
    () => posts.reduce(reducerInGroupOfThree, []),
    [posts]
  );

  const postsContainerRef = useRef();
  const postsForRender = useLazyLoad(postsContainerRef, groupedUserPosts, 100);

  return (
    <div className="posts_wrapper" ref={postsContainerRef}>
      {postsForRender.map((postGroup, index) => {
        return (
          <div className={"posts_group"} key={"postsGroup " + (index + 1)}>
            {postGroup.map(post => {
              return (
                <UsersPost
                  key={"post_" + post._id}
                  post={post}
                  postOwner={user}
                  modalPost={modalPost}
                  setModalPost={setModalPost}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
