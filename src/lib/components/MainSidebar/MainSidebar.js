import { HOME_SIDEBAR_LINKS } from "../../../pages/Home/pageHelpers";
import ExtendedButton from "../ExtendedButton";
import FlexBox from "../FlexBox";
import MainLogo from "../MainLogo";
import SimpleText from "../SimpleText";
import FlatList from "../util/FlatList";

const MainSidebar = ({ sideBarLinks, action }) => {
  return (
    <div
      style={{
        borderRight: "1px solid rgb(9, 121, 84, 0.3)",
        height: "100vh",
        display: "flex",
        width: "300px",
        flexDirection: "column",
        padding: "0px 20px",
        gap: "100px",
        position: "fixed",
      }}
    >
      <FlexBox direction={"column"} alignItems={"center"} gap={"medium"}>
        <MainLogo />
        <SimpleText content={"Twind"} size={"l"} />
      </FlexBox>
      <FlexBox direction={"column"} padding="small">
        <FlatList
          data={sideBarLinks}
          renderItem={(link) => (
            <ExtendedButton
              key={link.content}
              buttonSize={"l"}
              backgroundColor={"white"}
              textContent={link.content}
              textSize={"m"}
              iconSize={"m"}
              icon={link.icon}
              gap={"large"}
              src={link.src}
              justifyContent={"end"}
              action={action[link.path]}
            />
          )}
        />
      </FlexBox>
    </div>
  );
};

export default MainSidebar;
