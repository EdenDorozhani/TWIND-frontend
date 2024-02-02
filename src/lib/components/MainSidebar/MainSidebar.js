import ExtendedButton from "../ExtendedButton";
import FlexBox from "../FlexBox";
import MainLogo from "../MainLogo";
import SimpleText from "../SimpleText";
import FlatList from "../FlatList";
import { motion } from "framer-motion";

const MainSidebar = ({ sideBarLinks, action }) => {
  return (
    <div>
      <motion.div
        initial={{ x: -470 }}
        animate={{ x: 0 }}
        exit={{ x: -100 }}
        transition={{ duration: 0.3 }}
        style={{
          borderRight: "1px solid rgb(9, 121, 84, 0.3)",
          height: "100vh",
          display: "flex",
          width: "330px",
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
                gap={"l"}
                src={link.src}
                justifyContent={"end"}
                action={action[link.path]}
              />
            )}
          />
        </FlexBox>
      </motion.div>
    </div>
  );
};

export default MainSidebar;
