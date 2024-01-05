import { useEffect, useState } from "react";
import { postLikes } from "./useLikeAction.action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const useLikeAction = ({
  likedByUser,
  likes,
  id,
  userId,
  type,
  singlePost,
}) => {
  const [isLiked, setIsLiked] = useState(likedByUser);
  const [likeCount, setLikeCount] = useState(likes);

  useEffect(() => {
    if (!singlePost) return;
    setIsLiked(singlePost?.likedByUser);
    setLikeCount(singlePost?.likes);
  }, [singlePost]);

  const updateLikes = async () => {
    try {
      await postLikes(id, userId, isLiked, type);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const toggleLike = () => {
    if (isLiked === "0") {
      setLikeCount(likeCount + 1);
      setIsLiked("1");
    } else {
      setLikeCount(likeCount - 1);
      setIsLiked("0");
    }
    updateLikes();
  };

  return {
    isLiked,
    likeCount,
    toggleLike,
  };
};
