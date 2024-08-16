import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ImageWrapperProps {
  height?: string;
  width?: string;
  loading: boolean;
  src: string;
}

const ImageWrapper: React.FC<ImageWrapperProps> = ({
  height = "100%",
  width = "100%",
  loading,
  src,
}) => {
  return (
    <div
      style={{
        height: height,
        width: width,
        borderRadius: "inherit",
        aspectRatio: "1/1",
        minHeight: "auto",
        minWidth: "100%",
      }}
    >
      {loading ? (
        <Skeleton height="100%" width="100%" />
      ) : (
        <img
          alt=""
          width="100%"
          height="100%"
          style={{
            background: "#f0f0f0",
            objectFit: "cover",
            objectPosition: "center",
          }}
          src={src}
        />
      )}
    </div>
  );
};

export default ImageWrapper;
