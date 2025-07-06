import { COLORS } from "@/app/styles/colors";

const Arrow: React.FC<{ color?: string; size?: string | number }> = ({
  color,
  size,
}) => {
  return (
    <svg
      width={size || "24"}
      height={size || "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L2 12H9V22H15V12H22L12 2Z" fill={color || COLORS.primary} />
    </svg>
  );
};

export default Arrow;
