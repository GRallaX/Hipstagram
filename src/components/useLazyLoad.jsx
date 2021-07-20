import { useCallback, useEffect, useState } from "react";

const useLazyLoad = (
  containerRef,
  data = [],
  offsetHeight = 100,
  pushSize = 1
) => {
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
        containerRef.current?.clientHeight < window.innerHeight + offsetHeight)
    ) {
      const forRender = [];
      for (let i = 0; i < pushSize; i++) {
        if (dataForRender.length + i >= data.length) break;

        const item = data[dataForRender.length + i];
        forRender.push(item);
      }

      setDataForRender([...dataForRender, ...forRender]);
      setEndOfPage(false);
    }
  }, [endOfPage, data, dataForRender, containerRef, offsetHeight, pushSize]);

  useEffect(() => {
    setDataForRender([]);
  }, [data]);

  return dataForRender;
};

export default useLazyLoad;
