import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Link, Outlet, useLocation, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { updatedUserInfo } from "@/vendor";
import { IconSvg } from "@/component/";

const AvatarUploader = memo(({ isUpload = false, avatarId = "avatar1", className = "", avatarClass = "", labelName = "" }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.app);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (user.avatarUrl) setAvatar(user.avatarUrl);
  }, [user.avatarUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const data = { ...user, avatarUrl: reader.result };
        dispatch(updatedUserInfo(data));
      };
      reader.onerror = () => {
        console.error("Error reading file");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      // Logic để upload avatar lên server nếu cần
      console.log("Avatar uploaded:", avatar);
    },
    [avatar],
  );

  return (
    <div className={`avatar-uploader${className ? ` ${className}` : ""}`}>
      <form
        onSubmit={handleSubmit}
        className="position-relative pt-100">
        <label
          className={labelName}
          htmlFor={avatarId}>
          <input
            hidden
            type="file"
            name="file"
            id={avatarId}
            accept="image/*"
            onChange={handleImageChange}
          />
          <IconSvg
            className="icon-ctrl fs-1 text-info opacity-75 hover-100"
            link="camera"
          />
          {isUpload && <button type="submit">Upload</button>}
        </label>
        {avatar && (
          <img
            src={avatar}
            alt="Avatar Preview"
            className={`avatar-preview${avatarClass ? ` ${avatarClass}` : ""}`}
          />
        )}
      </form>
    </div>
  );
});

export default AvatarUploader;
