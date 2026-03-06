"use client";

import { useEffect, useState } from "react";

export type DeviceMode = "desktop" | "mobile";

interface DeviceState {
  deviceMode: DeviceMode;
  isCoarsePointer: boolean;
  isNarrowViewport: boolean;
}

function getDeviceState(): DeviceState {
  if (typeof window === "undefined") {
    return {
      deviceMode: "desktop",
      isCoarsePointer: false,
      isNarrowViewport: false
    };
  }

  const isNarrowViewport = window.innerWidth <= 820;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isMobile = window.innerWidth <= 640 || (isNarrowViewport && isCoarsePointer);

  return {
    deviceMode: isMobile ? "mobile" : "desktop",
    isCoarsePointer,
    isNarrowViewport
  };
}

export function useDeviceMode() {
  const [state, setState] = useState<DeviceState>(getDeviceState);

  useEffect(() => {
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    const update = () => {
      setState(getDeviceState());
    };

    update();
    window.addEventListener("resize", update);
    if (typeof coarseQuery.addEventListener === "function") {
      coarseQuery.addEventListener("change", update);
    } else {
      coarseQuery.addListener(update);
    }

    return () => {
      window.removeEventListener("resize", update);
      if (typeof coarseQuery.removeEventListener === "function") {
        coarseQuery.removeEventListener("change", update);
      } else {
        coarseQuery.removeListener(update);
      }
    };
  }, []);

  return state;
}
