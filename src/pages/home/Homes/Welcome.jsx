// Welcome.jsx
import React, { Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";

const Welcome = () => {
  return (
    <React.Fragment>
      <div className="container pt-5">
        <div className="pt-5 welcome-page text-center text-danger">
          <h1 className="p-3 mt-5 pt-5 fs-12 text-center">Welcome to NB website BN</h1>
          <h2 className="p-3 mt-5 fs-13">Hệ thống đang bảo trì. Vui lòng quay lại sau!</h2>
          <h2 className="pt-3 mt-5 mb-0 fs-15 fst-italic">The system is maintenance. Please come back later!</h2>
          <p className="pb-3 fs-1 fw-light text-primary fst-italic">We sincerely thank you very much!</p>
        </div>
        <div className="mt-5 pt-5 text-capitalize text-center">
          <Link
            to="/"
            className="btn btn-info py-3 px-5 rounded-3 fs-2 fst-italic">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
const InviteLogIn = () => {
  const navigate = useNavigate();
  const handlePress = () => {
    navigate(-1);
  };
  return (
    <Fragment>
      <div className="container d-flex flex-column pt-5 text-center vh-100">
        <h1 className="mt-5 pt-5 fst-italic fw-medium">🌜 Invite Users to login! 🌙</h1>
        <h2 className="px-4 py-5 fs-4 fw-lighter fst-italic text-center">Rất tiếc, bạn chưa đăng nhập nên không thể trải nghiệm dịch vụ này!</h2>
        <div className="d-flex align-items-center justify-content-center gap-4">
          <button
            className="px-5 py-2 fs-3 btn btn-outline-danger"
            type="button"
            onClick={handlePress}>
            Quay lại
          </button>
          <Link
            to="/login"
            className="btn btn-outline-info px-5 py-2 fs-3 fst-italic rounded-3"
            type="button">
            Đăng nhập!
          </Link>
          <Link
            to="/register"
            className="btn btn-outline-primary px-5 py-2 fs-3 fst-italic rounded-3"
            type="button">
            Đăng ký Free!
          </Link>
        </div>

        <div className="p-5 pe-0 w-75 fs-3 fst-italic text-start fw-normal mx-auto">
          <p>
            ⭐ Để trải nghiệm và tận hưởng trọn vẹn tất cả các tính năng tuyệt vời trong ứng dụng của chúng tôi, bao gồm thay đổi trạng thái và cập
            nhật thông tin tài khoản, bạn hãy đăng nhập vào hệ thống!!!
          </p>

          <p>
            👉 Chỉ với một bước đăng nhập, bạn sẽ mở ra cánh cửa đến một thế giới đầy tiện ích với trải nghiệm độc đáo. Hãy đăng nhập ngay bây giờ để
            bắt đầu hành trình với chúng tôi và cá nhân hóa trải nghiệm dành riêng cho bạn:
          </p>

          <p>👨Thay đổi trạng thái tài khoản, thể hiện phong cách và cá tính riêng.</p>
          <p>Cập nhật thông tin cá nhân, đảm bảo tính chính xác và đầy đủ.</p>
          <p>Truy cập các tính năng nâng cao, mang đến trải nghiệm tối ưu nhất.</p>
          <p>
            Hệ thống của chúng tôi luôn sẵn sàng chào đón bạn với giao diện thân thiện, thao tác đơn giản và bảo mật an toàn. Hãy dành ít phút đăng
            nhập để khám phá mọi điều thú vị mà ứng dụng của chúng tôi mang lại.
          </p>

          <p>💛Chúc bạn có những trải nghiệm tuyệt vời💛</p>
        </div>
      </div>
    </Fragment>
  );
};

export { InviteLogIn };
export default Welcome;
//  https://tranhuloc.github.io//CT250
