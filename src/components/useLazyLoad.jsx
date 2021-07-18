import { useCallback, useEffect, useState } from "react";

const useLazyLoad = (containerRef, data = [], offsetHeight = 100) => {
  const [endOfPage, setEndOfPage] = useState(false);
  const [dataForRender, setDataForRender] = useState([]);

  const feedScrollListener = useCallback(() => {
    if (
      document.documentElement.clientHeight + offsetHeight >
      containerRef.current?.getBoundingClientRect().bottom
    ) {
      setEndOfPage(true);
    }
  }, [containerRef, offsetHeight]);

  useEffect(() => {
    if (data.length > dataForRender.length) {
      window.addEventListener("resize", feedScrollListener, true);
      document.addEventListener("scroll", feedScrollListener, true);
    }
    return () => {
      document.removeEventListener("scroll", feedScrollListener);
      window.removeEventListener("resize", feedScrollListener);
    };
  }, [data, dataForRender, feedScrollListener]);

  useEffect(() => {
    if (
      data.length > dataForRender.length &&
      (endOfPage ||
        !dataForRender.length ||
        containerRef.current?.clientHeight < window.innerHeight)
    ) {
      const forRender = data[dataForRender.length];
      setDataForRender([...dataForRender, forRender]);
      setEndOfPage(false);
    }
  }, [endOfPage, data, dataForRender, containerRef]);

  useEffect(() => {
    setDataForRender([]);
  }, [data]);

  return dataForRender;
};

export default useLazyLoad;
