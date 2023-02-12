import React, { useState, useCallback, useContext, useRef } from "react";

const MoreVideosContext = React.createContext();

export function useMoreVideos() {
  return useContext(MoreVideosContext);
}

export function MoreVideosProvider({ children }) {
  const [loadMore, setLoadMore] = useState(false);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLoadMore(true);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMore]
  );

  return (
    <MoreVideosContext.Provider
      value={{ loadMore, setLoadMore, lastElementRef }}
    >
      {children}
    </MoreVideosContext.Provider>
  );
}
