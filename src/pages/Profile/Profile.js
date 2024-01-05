import { faTableCells } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../lib/components/Avatar";
import Button from "../../lib/components/Button";
import FlexBox from "../../lib/components/FlexBox";
import Icon from "../../lib/components/Icon";
import SimpleText from "../../lib/components/SimpleText";
import TextButton from "../../lib/components/TextButton";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useMultipleData from "../../hooks/useMultipleData";
import FlatList from "../../lib/components/util/FlatList";
import { formatImgUrl } from "../../lib/helpers";
import PostsGrid from "../../lib/components/PostsGrid";
import { getProfileData } from "./Profile.actions";
import useLoggedInUser from "../../context/useLoggedInUser";
import EndlessScroll from "../../lib/components/EndlessScroll";

const Profile = () => {
  const [profileUserData, setProfileUserData] = useState({});
  const { username } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userLoggedInData } = useLoggedInUser();

  const {
    data: profilePostsData,
    getDataPagination: getProfilePosts,
    isLoading: isLoadingProfile,
    setData,
  } = useMultipleData({
    pageSize: 12,
    path: "getProfilePostsData",
  });

  const fetchProfileUserData = async () => {
    try {
      const response = await getProfileData(username);
      setProfileUserData(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state === null) return;
    setData((prevState) => ({
      ...prevState,
      data: prevState.data.filter((post) => +state.postId !== post.postId),
    }));
  }, [state]);

  useEffect(() => {
    fetchProfileUserData();
    getProfilePosts(username);
  }, [username]);

  const onOpenPost = (postId) => {
    navigate(`p/${postId}`);
  };

  const onEditNavigation = () => {
    navigate("/twind/edit-profile");
  };

  return (
    <div style={{ paddingLeft: "340px", paddingRight: "40px" }}>
      <div
        style={{
          display: "flex",
          padding: "15px",
          flexDirection: "column",
          gap: "80px",
        }}
      >
        <FlexBox gap={"extra large"}>
          <Avatar size={"xl"} src={formatImgUrl(profileUserData.userImgURL)} />
          <FlexBox direction={"column"} justifyContent={"center"} gap={"large"}>
            <FlexBox gap={"medium"}>
              <SimpleText
                content={profileUserData.username}
                color={"black"}
                size={"l"}
                fontWeight={"bold"}
              />
              {userLoggedInData.username === username ? (
                <Button content={"Edit profile"} action={onEditNavigation} />
              ) : (
                <Button content={"Follow"} />
              )}
            </FlexBox>
            <FlexBox gap={"large"} alignItems={"center"}>
              <SimpleText
                content={`${profilePostsData.count} posts`}
                size={"m"}
              />
              <TextButton content={`${35} followers`} fontWeight={"thin"} />
            </FlexBox>
            <FlexBox gap={"small"}>
              <SimpleText content={profileUserData.country} color={"black"} />
            </FlexBox>

            <div style={{ maxWidth: "500px" }}>
              <SimpleText content={profileUserData.about} />
            </div>
          </FlexBox>
        </FlexBox>
        <FlexBox direction={"column"} alignItems={"center"} gap={"medium"}>
          {profilePostsData.data.length === 0 ? (
            <SimpleText content={"You have no posts."} size={"l"} />
          ) : (
            <div style={{ borderTop: "1px solid green" }}>
              <FlexBox gap={"medium"} padding={"small"}>
                <Icon iconName={faTableCells} size={"s"} />
                <SimpleText content={"Posts"} size={"m"} />
              </FlexBox>
            </div>
          )}
          <EndlessScroll
            loadMore={() => getProfilePosts(username)}
            dataLength={profilePostsData.data.length}
            totalCount={profilePostsData.count}
            isLoading={isLoadingProfile}
          >
            <FlexBox wrap gap={"small"} justifyContent={"center"}>
              <FlatList
                data={profilePostsData.data}
                renderItem={(post) => (
                  <PostsGrid
                    key={post.postId}
                    postId={post.postId}
                    imageUrl={formatImgUrl(post.postImage)}
                    commentCount={post.comments}
                    likeCount={post.likeCount}
                    action={onOpenPost}
                    images={profilePostsData.data}
                  />
                )}
              />
            </FlexBox>
          </EndlessScroll>
        </FlexBox>
      </div>
    </div>
  );
};

export default Profile;
