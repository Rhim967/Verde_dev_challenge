import React from "react";

export const Button = ({
  onClick,
  buttonType,
  type,
  className,
  href,
  children,
}) => {
  switch (buttonType) {
    case "button":
      return (
        <button onClick={onClick} type={type} className={className}>
          {children}
        </button>
      );
    case "link":
      const hr = href;
      return (
        <a className={className} href={hr}>
          {children}
        </a>
      );
  }
};
