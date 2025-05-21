import { useState, useEffect } from "react";

export function useScroll(threshold: number = 0): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Call handler right away so state gets updated with initial window.scrollY
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return scrolled;
}
