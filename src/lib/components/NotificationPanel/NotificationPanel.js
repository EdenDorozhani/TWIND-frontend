import FlexBox from "../FlexBox";
import SimpleText from "../SimpleText";
import NotificationsFilter from "../NotificationsFilter";
import FlatList from "../util/FlatList";
import EndlessScroll from "../EndlessScroll/EndlessScroll";

const NotificationPanel = ({
  notificationsData,
  dateRangeData,
  onNotificationClick,
  onUsernamesClick,
}) => {
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
      <EndlessScroll
        totalCount={notificationsData.responseData.count}
        dataLength={notificationsData.responseData.data.length}
        isLoading={notificationsData.isLoading}
        loadMore={() => notificationsData.getDataPagination()}
        useWindow={false}
      >
        <FlexBox direction={"column"}>
          <div style={{ borderBottom: "1px solid rgb(9, 121, 84, 0.3)" }}>
            <FlexBox padding={"medium"} direction={"column"} gap={"medium"}>
              <SimpleText content={"New"} color={"black"} size={"m"} />
              <FlatList
                data={dateRangeData.newData}
                renderItem={(notification) => (
                  <NotificationsFilter
                    onUsernamesClick={onUsernamesClick}
                    onNotificationClick={onNotificationClick}
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
                data={dateRangeData.thisMonthData}
                renderItem={(notification) => (
                  <NotificationsFilter
                    onUsernamesClick={onUsernamesClick}
                    onNotificationClick={onNotificationClick}
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
                data={dateRangeData.earlierData}
                renderItem={(notification) => (
                  <NotificationsFilter
                    onUsernamesClick={onUsernamesClick}
                    onNotificationClick={onNotificationClick}
                    key={notification._key || ""}
                    data={notification}
                  />
                )}
              />
            </FlexBox>
          </div>
        </FlexBox>
      </EndlessScroll>
    </div>
  );
};

export default NotificationPanel;
