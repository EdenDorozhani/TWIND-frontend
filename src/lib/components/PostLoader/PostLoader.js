import FlexBox from "../FlexBox";

const PostLoader = ({ isLoading, isEmpty }) => {
  if (!isLoading && !isEmpty) {
    return;
  }

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#eef7ed",
        borderRadius: "15px",
        width: "400px",
      }}
    >
      <FlexBox direction={"column"} gap={"m"}>
        <div
          style={{
            margin: "20px 0px",
            width: "150px",
            backgroundColor: "rgb(231 241 230)",
            borderRadius: "10px",
            height: "10px",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            backgroundColor: "rgb(231 241 230)",
            borderRadius: "3px",
            height: "410px",
          }}
        ></div>
        <div
          style={{
            width: "120px",
            backgroundColor: "rgb(231 241 230)",
            borderRadius: "10px",
            height: "10px",
          }}
        ></div>
        <div
          style={{
            width: "90px",
            backgroundColor: "rgb(231 241 230)",
            borderRadius: "10px",
            height: "10px",
          }}
        ></div>
      </FlexBox>
    </div>
  );
};

export default PostLoader;
