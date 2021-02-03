import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useDarkMode = () => {
  const [useDark, setUseDark] = useLocalStorage("dark", true);

  useEffect(() => {
    const body = document.querySelector("body")
    if (useDark) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [useDark]);

  return [useDark, setUseDark];
};
