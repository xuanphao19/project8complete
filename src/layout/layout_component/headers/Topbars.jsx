// Nó thường xuất hiện ở đầu trang Có thể chứa các phần như logo, menu điều hướng. Hoặc có thể tách biệt Chứa các liên kết quan trọng khác!

import React from "react";

const Topbar = () => {
  /* className="flex-center gap-4 fs-4"
  title="Thông tin liên hệ nhanh:"
  address="136, Yên BÌnh, Yên Nghĩa."
  email="nguyenthanhhoa075@gmail.com"
  phone="+84 979351075"
  */

  return (
    <div
      id="top-bar"
      className="top-bar text-body bg-info bg-gradient bg-opacity-10 ps-2 w-100 d-none d-md-flex">
      {/* <ContactInfo className="d-flex align-items-end container gap-4 p-2 fs-4" email="nguyenthanhhoa075@gmail.com" phone="+84 979351075" /> */}
    </div>
  );
};

export default Topbar;
