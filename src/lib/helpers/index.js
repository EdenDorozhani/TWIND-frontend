export const formatText = (text) =>
  text.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();

export const formatImgUrl = (url) => `http://localhost:3131/${url}`;

export const shouldInterruptInfinityScroll = ({
  isLoading,
  action,
  actionParams,
}) => {
  let funct;
  if (isLoading) {
    funct = () => {};
  } else {
    funct = action(actionParams);
  }
  return funct;
};

export const fromArrayToObject = (data) => {
  return data.reduce((sum, curr) => {
    return { ...sum, [curr.path]: curr.msg };
  }, {});
};
