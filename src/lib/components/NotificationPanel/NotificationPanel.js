import FlexBox from "../FlexBox";
import Description from "../Description";
import SimpleText from "../SimpleText";

const NotificationPanel = ({ author, imageSrc }) => {
  return (
    <div
      style={{
        borderLeft: "1px solid rgb(9, 121, 84, 0.3)",
        position: "fixed",
        width: "300px",
        height: "100vh",
        right: 0,
      }}
    >
      <FlexBox padding={"medium"}>
        <SimpleText content="Notifications" size={"l"} />
      </FlexBox>
      <FlexBox direction={"column"}>
        <div style={{ borderBottom: "1px solid rgb(9, 121, 84, 0.3)" }}>
          <FlexBox padding={"medium"} direction={"column"} gap={"medium"}>
            <SimpleText content={"Today"} color={"black"} />
            <Description
              author={author}
              description={"liked your photo!"}
              notification={true}
              avatarSrc={"Dawda"}
              imageSrc={imageSrc}
            />
          </FlexBox>
        </div>
      </FlexBox>
    </div>
  );
};

export default NotificationPanel;
