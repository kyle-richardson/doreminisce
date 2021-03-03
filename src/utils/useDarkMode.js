import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useDarkMode = () => {
  const [useDark, setUseDark] = useLocalStorage("dark", true);

  useEffect(() => {
    const body = document.querySelector("body")
    // const rows = document.querySelectorAll(".song-card")
    // const icons = document.querySelector(".icons").childNodes
    if (useDark) {
      body.classList.add("dark");
      // rows.forEach(row=> row.classList.add("dark-row"))
      // icons.forEach(icon=> icon.classList.add("dark"))
    } else {
      body.classList.remove("dark");
      // rows.forEach(row=> row.classList.remove("dark-row"))
      // icons.forEach(icon=> icon.classList.remove("dark"))
    }
  }, [useDark]);

  return [useDark, setUseDark];
};
