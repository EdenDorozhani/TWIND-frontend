import Description from "./Description";
import { formatImgUrl } from "../helpers";
import { getPassedTime } from "./Post/helpers";

const NotificationsFilter = ({ data }) => {
  const truncatedDescription =
    data.description?.length > 60
      ? data.description.slice(0, 60) + "..."
      : data.description;

  const filterByType = () => {
    let notification;
    switch (data.type) {
      case "postsLikes":
        return (notification = (
          <Description
            author={data.username}
            description={
              data.others !== 0
                ? `and ${data.others} ${
                    data.others === 1 ? `other` : `others`
                  } liked your post`
                : `liked your post`
            }
            notification={true}
            avatarSrc={formatImgUrl(data.userImgURL)}
            imageSrc={formatImgUrl(data.postImage)}
            timePassed={getPassedTime(data.createdAt)}
          />
        ));
      case "comments":
        return (notification = (
          <Description
            author={data.username}
            description={
              data.others !== 0
                ? `commented: ${truncatedDescription} on your post along with ${
                    data.others
                  } ${data.others === 1 ? `other` : `others`} `
                : `commented: ${truncatedDescription}`
            }
            notification={true}
            avatarSrc={formatImgUrl(data.userImgURL)}
            imageSrc={formatImgUrl(data.postImage)}
            timePassed={getPassedTime(data.createdAt)}
          />
        ));
      case "commentLikes":
        return (notification = (
          <Description
            author={data.username}
            description={
              data.others !== 0
                ? `and ${data.others} ${
                    data.others === 1 ? `other` : `others`
                  } liked your comment: ${truncatedDescription}`
                : `liked your comment: ${truncatedDescription}`
            }
            notification={true}
            avatarSrc={formatImgUrl(data.userImgURL)}
            imageSrc={formatImgUrl(data.postImage)}
            timePassed={getPassedTime(data.createdAt)}
          />
        ));
      case "followers":
        return (notification = (
          <Description
            author={data.username}
            description={
              data.others !== 0
                ? `and ${data.others} ${
                    data.others === 1 ? `other` : `others`
                  } followed you`
                : `followed you`
            }
            notification={true}
            avatarSrc={formatImgUrl(data.userImgURL)}
            timePassed={getPassedTime(data.createdAt)}
          />
        ));
    }
  };
  const notificationType = filterByType();

  return notificationType;
};

export default NotificationsFilter;
