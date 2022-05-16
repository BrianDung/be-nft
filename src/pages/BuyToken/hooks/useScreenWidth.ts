import { useState, useEffect } from "react";

export default function useScreenResize() {
  const defaultScreenWidth = () => {
    const scrWidth = window.innerWidth;
    if (scrWidth >= 1200) {
      return'lg';
    } else if (960 <= scrWidth && scrWidth <= 1200) {
      return "md"
    } else if (768 <= scrWidth && scrWidth <= 960) {
      return "sm"
    } else {
      return "xs"
    }
  }

  const [screenWidth, setScreenWidth] = useState(defaultScreenWidth());

  useEffect(() => {
    defaultScreenWidth()

    window.onresize = () => {
      const scrWidth = window.innerWidth;

      if (scrWidth >= 1200) {
        setScreenWidth("lg");
      } else if (960 <= scrWidth && scrWidth <= 1200) {
        setScreenWidth("md");
      } else if (768 <= scrWidth && scrWidth <= 960) {
        setScreenWidth("sm");
      } else {
        setScreenWidth("xs");
      }
    };
  }, [screenWidth]);

  return [screenWidth]
}
