import TextButton from "../components/TextButton";

export const formatText = (text) =>
  text.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();

export const formatImgUrl = (url) => {
  if (!!url) {
    return `http://localhost:3131/${url}`;
  }
};

export const fromArrayToObject = (data) => {
  return data.reduce((sum, curr) => {
    return { ...sum, [curr.path]: curr.msg };
  }, {});
};

export const getPassedTime = (createdAt) => {
  if (!createdAt) return;
  const postDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifferenceInSeconds = Math.floor((currentDate - postDate) / 1000);
  let timeAgo;
  if (timeDifferenceInSeconds < 60) {
    timeAgo = `${timeDifferenceInSeconds} sec ago`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    timeAgo = `${minutes} min ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    timeAgo = `${hours}h`;
  } else if (timeDifferenceInSeconds < 604799) {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    timeAgo = `${days}d`;
  } else if (timeDifferenceInSeconds < 2628000) {
    const days = Math.floor(timeDifferenceInSeconds / 604799);
    timeAgo = `${days}w`;
  } else {
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    timeAgo = `${formatter.format(postDate)}`;
  }

  return timeAgo;
};

export const textTruncation = (caption, fullContent, textButtonAction) => {
  let formatedText;
  let moreText;
  if (caption?.length > 39 && !fullContent) {
    formatedText = `${caption.slice(0, 39)}...`;
    moreText = (
      <TextButton content={"more"} color={"fade"} action={textButtonAction} />
    );
  } else {
    formatedText = caption;
    moreText = "";
  }

  return { formatedText, moreText };
};
