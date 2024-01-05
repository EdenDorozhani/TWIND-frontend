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
    let funct;
    if (isLoading) {
      funct = () => {};
    } else {
      funct = loadMore();
    }
    return funct;
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
