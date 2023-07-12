import NoSleep from "nosleep.js";
import { useEffect, useRef } from "react";

export const useNoSleep = () => {
  const noSleep = useRef(new NoSleep());

  useEffect(() => {
    const noSleepInstance = noSleep.current;
    noSleepInstance.enable();

    return () => {
      noSleepInstance.disable();
    };
  }, []);
};
