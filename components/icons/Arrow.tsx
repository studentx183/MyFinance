import { COLORS } from "@/app/styles/colors";
import React from "react";
import Svg, { Path } from "react-native-svg";

const Arrow: React.FC<{
  color?: string;
  size?: string | number;
  direction?: "left" | "right" | "up" | "down";
}> = ({ color, size = 24, direction = "up" }) => {
  const getRotation = (dir: string) => {
    switch (dir) {
      case "up":
        return "0";
      case "right":
        return "90";
      case "down":
        return "180";
      case "left":
        return "270";
      default:
        return "0";
    }
  };

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      rotation={parseInt(getRotation(direction), 10)}
    >
      <Path d="M12 2L2 12H9V22H15V12H22L12 2Z" fill={color || COLORS.primary} />
    </Svg>
  );
};

export default Arrow;
