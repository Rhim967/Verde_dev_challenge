import { useState } from "react";

import { Link } from "react-router-dom";

export const PostItem = ({ post }) => {
  const { id, title, body } = post;
  // just because dont want waiste time to create class component for using refs (but class component would be more correct way)
  const [hovered, setHovered] = useState(false);

  const handleFocus = () => {
    setHovered(true);
  };

  const handleUnFocus = () => {
    setHovered(false);
  };

  return (
    <div className="" onMouseEnter={handleFocus} onMouseLeave={handleUnFocus}>
      <Link to={`/post/${id}`}>
        <p
          className={`text-[10px] text-gray-400 ${
            hovered ? "text-sky-400" : ""
          }`}
        >
          card body number {id}
        </p>
        <div
          className={`card_inner py-3 px-2 mt-2 ${
            hovered ? "border-2 border-sky-400" : ""
          }`}
        >
          <h3 className=" font-bold text-xs lg:text-lg md:text-md">
            {title.slice(0, 16) + (title.length > 15 ? " ..." : "")}
          </h3>
          <p
            className={`mt-2  text-[10px] text-gray-500 sm:text-xs md:text-sm ${
              hovered ? "border-2 border-dashed border-sky-400" : ""
            }`}
          >
            {body.slice(0, 201) + (title.length > 200 ? " ..." : "")}
          </p>
        </div>
      </Link>
    </div>
  );
};
