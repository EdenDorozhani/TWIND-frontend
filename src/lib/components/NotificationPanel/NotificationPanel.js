import FlexBox from "../FlexBox";
import SimpleText from "../SimpleText";
import NotificationsFilter from "../NotificationsFilter";
import FlatList from "../FlatList";
import ScrollPagination from "../ScrollPagination";
import Spinner from "../Spinner";

const NotificationPanel = ({
  notifications,
  dateRangeData,
  onNotificationPostClick,
  navigateToUserProfile,
  userId,
  interruptFollowersCall,
}) => {
  const generateKey = (id) => {
    return `${id}_${new Date().getTime()}`;
  };

  return (
    <div
      style={{
        borderLeft: "1px solid rgb(9, 121, 84, 0.3)",
        position: "fixed",
        width: "371px",
        height: "100vh",
        right: 0,
        overflowY: "sroll",
      }}
    >
      <FlexBox padding={"m"}>
        <SimpleText content="Notifications" size={"l"} />
      </FlexBox>
      <ScrollPagination
        dataLength={notifications.paginationData.data.length}
        isLoading={notifications.isLoading}
        totalCount={notifications.paginationData.count}
        useWindow={false}
        loadMore={() =>
          notifications.getDataPagination({
            userLoggedIn: userId,
            withPages: true,
            interrupt: interruptFollowersCall,
          })
        }
        withTransition={true}
      >
        <FlexBox direction={"column"}>
          <div style={{ borderBottom: "1px solid rgb(9, 121, 84, 0.3)" }}>
            <FlexBox padding={"m"} direction={"column"} gap={"m"}>
              <SimpleText content={"New"} color={"black"} size={"m"} />
              {dateRangeData.newData.length === 0 && (
                <SimpleText content={"No new notifications"} />
              )}
              <FlatList
                data={dateRangeData.newData}
                renderItem={(notification) => (
                  <NotificationsFilter
                    navigateToUserProfile={navigateToUserProfile}
                    onNotificationPostClick={onNotificationPostClick}
                    key={generateKey(Math.random())}
                    data={notification}
                  />
                )}
              />
            </FlexBox>
          </div>
          <div style={{ borderBottom: "1px solid rgb(9, 121, 84, 0.3)" }}>
            <FlexBox padding={"m"} direction={"column"} gap={"m"}>
              <SimpleText content={"This month"} color={"black"} size={"m"} />
              {dateRangeData.thisMonthData.length === 0 && (
                <SimpleText content={"No notifications for this month"} />
              )}
              <FlatList
                data={dateRangeData.thisMonthData}
                renderItem={(notification) => (
                  <NotificationsFilter
                    navigateToUserProfile={navigateToUserProfile}
                    onNotificationPostClick={onNotificationPostClick}
                    key={generateKey(Math.random())}
                    data={notification}
                  />
                )}
              />
            </FlexBox>
          </div>
          <div style={{ borderBottom: "1px solid rgb(9, 121, 84, 0.3)" }}>
            <FlexBox padding={"m"} direction={"column"} gap={"m"}>
              <SimpleText content={"Earlier"} color={"black"} size={"m"} />
              {dateRangeData.earlierData.length === 0 && (
                <SimpleText content={"No earlier notifications"} />
              )}
              <FlatList
                data={dateRangeData.earlierData}
                renderItem={(notification) => (
                  <NotificationsFilter
                    navigateToUserProfile={navigateToUserProfile}
                    onNotificationPostClick={onNotificationPostClick}
                    key={generateKey(Math.random())}
                    data={notification}
                  />
                )}
              />
            </FlexBox>
          </div>
        </FlexBox>
      </ScrollPagination>
    </div>
  );
};

export default NotificationPanel;
