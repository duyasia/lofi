import React from "react";

interface IconProps {
  name: string;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Icon component using Google Material Symbols Rounded
 * Usage: <Icon name="play_arrow" size={24} />
 */
const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  className = "",
  style = {}
}) => {
  const sizeValue = typeof size === "number" ? `${size}px` : size;
  
  return (
    <span
      className={`material-symbols-rounded ${className}`}
      style={{
        fontSize: sizeValue,
        width: sizeValue,
        height: sizeValue,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {name}
    </span>
  );
};

export default Icon;

