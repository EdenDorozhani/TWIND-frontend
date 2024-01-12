import InfiniteScroll from "react-infinite-scroller";

const EndlessScroll = ({
  children,
  totalCount,
  dataLength,
  useWindow,
  loadMore,
  isLoading,
}) => {
  const shouldInterruptInfinityScroll = () => {
    return isLoading ? () => {} : loadMore;
  };

  return (
    <InfiniteScroll
      loadMore={shouldInterruptInfinityScroll}
      hasMore={totalCount > dataLength}
      useWindow={useWindow}
    >
      {children}
    </InfiniteScroll>
  );
};

export default EndlessScroll;
