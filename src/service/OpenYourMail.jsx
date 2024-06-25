import React, { useState, useCallback, memo, useEffect } from "react";
import { IconSvg } from "@/component";

const OpenYourMail = memo(({ email, onClose }) => {
  const [urlEmail, setUrlEmail] = useState("");

  useEffect(() => {
    if (typeof email === "string" && email.includes("@")) {
      const domain = email.substring(email.lastIndexOf("@") + 1).toLowerCase();
      switch (domain) {
        case "gmail.com":
          setUrlEmail("https://mail.google.com/mail");
          break;
        case "yahoo.com":
          setUrlEmail("https://mail.yahoo.com/");
          break;
        case "outlook.com":
        case "hotmail.com":
          setUrlEmail("https://outlook.live.com/");
          break;
        default:
          setUrlEmail(`https://www.google.com/search?q=${domain}+email+login`);
          break;
      }
    }
  }, [email]);

  const handleClose = useCallback(() => {
    if (typeof onClose === "function") {
      onClose();
    }
  }, []);

  return (
    <a
      className="open-mail btn flex-center btn-outline-primary w-100 p-3 fs-5"
      href={urlEmail}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClose}>
      <span className="">Go To Mail!</span>
      <IconSvg
        link="envelope"
        className="icon-ctrl ms-3 fs-4"
      />
    </a>
  );
});

export default OpenYourMail;
