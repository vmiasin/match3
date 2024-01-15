import { MutableRefObject, useLayoutEffect, useState } from "react";

export const useSize = (ref: MutableRefObject<HTMLDivElement | null>) => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    if (ref && ref.current) {
      const updateSize = () => {
        setSize([
          ref.current?.offsetWidth || 0,
          ref.current?.offsetHeight || 0,
        ]);
      };

      window.addEventListener("resize", updateSize);

      updateSize();

      return () => {
        window.removeEventListener("resize", updateSize);
      };
    }
  }, [ref]);

  return size;
};
