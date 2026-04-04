"use client";

import { useEffect, useRef } from "react";

export function useAutoRefresh(
  callback: () => void,
  intervalMs: number,
  isActive: boolean
) {
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isActive) return;
    savedCallback.current();
    const id = setInterval(() => savedCallback.current(), intervalMs);
    return () => clearInterval(id);
  }, [isActive, intervalMs]);
}
