import InfiniteScroll from "react-infinite-scroller";
import { motion } from "framer-motion";
const ScrollPagination = ({
  children,
  totalCount,
  dataLength,
  loadMore,
  isLoading,
  useWindow,
  withTransition,
}) => {
  const shouldInterruptInfinityScroll = () => {
    if (isLoading) {
      return () => {};
    }
    return loadMore;
  };

  let component;

  if (!!withTransition) {
    component = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <InfiniteScroll
          loadMore={shouldInterruptInfinityScroll()}
          hasMore={!isLoading && totalCount > dataLength}
          useWindow={useWindow}
        >
          {children}
        </InfiniteScroll>
      </motion.div>
    );
  } else {
    component = (
      <InfiniteScroll
        loadMore={shouldInterruptInfinityScroll()}
        hasMore={!isLoading && totalCount > dataLength}
        useWindow={useWindow}
      >
        {children}
      </InfiniteScroll>
    );
  }

  return component;
};

export default ScrollPagination;
