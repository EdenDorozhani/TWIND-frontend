import FlexBox from "../FlexBox";
import SimpleText from "../SimpleText";
import NotificationsFilter from "../NotificationsFilter";
import FlatList from "../util/FlatList";

const NotificationPanel = ({ data }) => {
  const currentDate = new Date();

  const newData = data.filter((e) => {
    const notificationDate = new Date(e.createdAt);
    const timeDifferenceInSeconds = Math.floor(
      (currentDate - notificationDate) / 1000
    );
    return timeDifferenceInSeconds < 86400;
  });

  const thisMonthData = data.filter((e) => {
    const notificationDate = new Date(e.createdAt);
    const timeDifferenceInSeconds = Math.floor(
      (currentDate - notificationDate) / 1000
    );
    return timeDifferenceInSeconds > 86400 && timeDifferenceInSeconds < 2678400;
  });

  const earlierData = data.filter((e) => {
    const notificationDate = new Date(e.createdAt);
    const timeDifferenceInSeconds = Math.floor(
      (currentDate - notificationDate) / 1000
    );
    return timeDifferenceInSeconds > 2678400;
  });
  console.log(newData);

  return (
    <div
      style={{
        borderLeft: "1px solid rgb(9, 121, 84, 0.3)",
        position: "fixed",
        width: "371px",
        height: "100vh",
        right: 0,
        overflowY: "auto",
      }}
    >
      <FlexBox padding={"medium"}>
        <SimpleText content="Notifications" size={"l"} />
      </FlexBox>
      <FlexBox direction={"column"}>
        <div style={{ borderBottom: "1px solid rgb(9, 121, 84, 0.3)" }}>
          <FlexBox padding={"medium"} direction={"column"} gap={"medium"}>
            <SimpleText content={"New"} color={"black"} size={"m"} />
            <FlatList
              data={newData}
              renderItem={(notification) => (
                <NotificationsFilter
                  key={notification._key || ""}
                  data={notification}
                />
              )}
            />
          </FlexBox>
        </div>
        <div style={{ borderBottom: "1px solid rgb(9, 121, 84, 0.3)" }}>
          <FlexBox padding={"medium"} direction={"column"} gap={"medium"}>
            <SimpleText content={"This month"} color={"black"} size={"m"} />
            <FlatList
              data={thisMonthData}
              renderItem={(notification) => (
                <NotificationsFilter
                  key={notification._key || ""}
                  data={notification}
                />
              )}
            />
          </FlexBox>
        </div>
        <div style={{ borderBottom: "1px solid rgb(9, 121, 84, 0.3)" }}>
          <FlexBox padding={"medium"} direction={"column"} gap={"medium"}>
            <SimpleText content={"Earlier"} color={"black"} size={"m"} />
            <FlatList
              data={earlierData}
              renderItem={(notification) => (
                <NotificationsFilter
                  key={notification._key || ""}
                  data={notification}
                />
              )}
            />
          </FlexBox>
        </div>
      </FlexBox>
    </div>
  );
};

export default NotificationPanel;
