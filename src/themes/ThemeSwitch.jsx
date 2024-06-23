import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconSvg } from "@/component";
import { setTheme } from "@/vendor";

const ThemeSwitch = ({ className, children }) => {
  const theme = useSelector((state) => state.app.theme);
  const dispatch = useDispatch();
  const iconRef = useRef(null);

  useEffect(() => {
    dispatch(setTheme(theme));
  }, []);

  const handleClickChangeTheme = () => {
    const value = iconRef.current && iconRef.current.getAttribute("name");
    dispatch(setTheme(changeTheme(value)));
  };

  const changeTheme = (value) => {
    switch (value) {
      case "girl":
      case "Admin":
        return {
          iconFill: "text-danger",
          icon: "Sun",
          theme: "light",
        };
      case "Sun":
        return {
          iconFill: "text-warning",
          icon: "Mon-and-star",
          theme: "dark",
        };
      case "Mon-and-star":
        return {
          iconFill: "text-success",
          icon: "Admin",
          // icon: "Sun",
          theme: "light",
        };
      default:
        return;
    }
  };

  return (
    <span
      onClick={handleClickChangeTheme}
      className={`cursor-pointer flex-center ${theme && theme.iconFill}${className ? ` ${className}` : ""}`}>
      {children}
      <IconSvg
        ref={iconRef}
        className={`${!children && theme.icon === "Admin" ? ` p-1 pt-2` : theme.icon === "Admin" ? " p-1 pb-2" : ""}`}
        link={children && theme.icon === "Admin" ? "girl" : theme.icon}
      />
    </span>
  );
};

export default ThemeSwitch;
