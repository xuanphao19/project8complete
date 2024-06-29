import React from "react";
import { IconSvg } from "@/component";

const ContactInfo = ({ title = "", address = "", email = "", phone = "", children, ...props }) => {
  return (
    <div {...props}>
      {title && (
        <span
          className="title fs-3 fst-italic fw-medium"
          style={{ transform: "translateY(0.1em)" }}>
          {title}
        </span>
      )}
      {address && <span className="address ps-3">{address}</span>}
      {email && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="email fs-4 ps-3 fst-italic d-flex align-items-end"
          href={`mailto:${email}?subject=Chào bạn&body= %0A%0A%0A--Vui lòng nhập phản hồi của bạn ở đây--%0A`}>
          <span className="fs-3 pe-3">
            <IconSvg link="envelope" />
          </span>
          <span>{email}</span>
        </a>
      )}
      {phone && (
        <span className="phone fs-4 ps-3 text-info d-flex align-items-end">
          <span className="fs-4 pe-3 pb-1">
            <IconSvg link="phone-arrow-up-right" />
          </span>
          <span>{phone}</span>
        </span>
      )}
      {children}
    </div>
  );
};

export default ContactInfo;
