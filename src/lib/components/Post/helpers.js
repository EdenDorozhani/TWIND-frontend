import TextButton from "../TextButton";

export const getPassedTime = (createdAt) => {
  if (!createdAt) return;
  const postDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifferenceInSeconds = Math.floor((currentDate - postDate) / 1000);
  let timeAgo;
  if (timeDifferenceInSeconds < 60) {
    timeAgo = `${timeDifferenceInSeconds} seconds ago`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    timeAgo = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
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
