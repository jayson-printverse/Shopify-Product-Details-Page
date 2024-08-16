import React, { useEffect, useState } from "react";

interface FlexMediaProps {
  children: React.ReactNode;
  height?: string;
  width?: string;
}

const FlexMedia: React.FC<FlexMediaProps> = ({
  children,
  height = "auto",
  width = "100%",
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth < 768) {
        setIsSmallScreen(true); // Stack vertically for small screens (sm breakpoint)
      } else {
        setIsSmallScreen(false); // Horizontal layout for medium and larger screens
      }
    };

    // Initial check
    updateScreenSize();

    // Update on resize
    window.addEventListener("resize", updateScreenSize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row", // Stack vertically on small screens
        height,
        width,
        gap: "var(--p-space-card-gap)",
        alignItems: "start",
      }}
    >
      <div
        style={{
          order: 1, // First element stays first
          flex: isSmallScreen ? "auto" : "1", // Auto-sized on small screens, flexible on larger screens
        }}
      >
        {children && React.Children.toArray(children)[0]}
      </div>
      <div
        style={{
          order: 2, // Second element stays second, underneath the first element on small screens
          flex: "0 0 180px", // Fixed at 120px
          width: isSmallScreen ? "100%" : "120px", // Full width on small screens, 120px on larger screens
        }}
      >
        {children && React.Children.toArray(children)[1]}
      </div>
    </div>
  );
};

export default FlexMedia;
