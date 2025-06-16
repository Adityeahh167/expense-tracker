import React from "react";
import { getInitials } from "../../utils/helper";
const CharAvatar = ({ fullName, widhth, height, style }) => {
  return (
    <div
      className={`${widhth || "w-12"}${height || "h-12"}${
        style || ""
      } flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
