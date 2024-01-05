import FlexBox from "../FlexBox";

const FlatList = ({ data, renderItem }) => {
  return !!data && data.map((item) => renderItem(item));
};

export default FlatList;
