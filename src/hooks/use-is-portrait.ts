"use client";

import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};

  const media = window.matchMedia("(orientation: portrait)");
  media.addEventListener("change", callback);

  return () => media.removeEventListener("change", callback);
};

const getSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(orientation: portrait)").matches;
};

const getServerSnapshot = () => false;

export function useIsPortrait() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
