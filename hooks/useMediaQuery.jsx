import { useEffect, useRef, useState } from "react";

function useMediaQuery(mediaQuery) {
  const ref = useRef(true);
  const [isMediaMatch, setIsMediaMatch] = useState(null);

  useEffect(() => {
    if (ref.current) {
      setIsMediaMatch(window.matchMedia(mediaQuery).matches);
      ref.current = false;
      return;
    }
    const mediaQueryList = window.matchMedia(mediaQuery);
    const mqlHandler = () => setIsMediaMatch(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", mqlHandler);
    return () => {
      mediaQueryList.removeEventListener("change", mqlHandler);
    };
  }, [mediaQuery]);

  return isMediaMatch;
}

export default useMediaQuery;
