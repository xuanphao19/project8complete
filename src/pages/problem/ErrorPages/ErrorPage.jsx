import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log("useRouteError::::::::::::", error);
  return (
    <div
      id="error-page"
      className="container">
      <div className="text-center p-5">
        <h1>Có lỗi không mong muốn!</h1>
        <h2>Liên hệ ban quản trị để biết thêm thông tin và cách khắc phục!</h2>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
      <div className="py-3 px-5 fs-2 bg-danger bg-opacity-10">
        <p>{`Error status: ${error.status}`}</p>
        <p>{`Error statusText: ${error.statusText}`}</p>
        <p>{error.message}</p>
        <p>{error.error?.stack}</p>
      </div>
      <p className="text-end">
        <Link
          className="py-3 px-5 btn fs-1 btn-outline-primary"
          to={"/"}>
          Về trang chủ
        </Link>
      </p>
    </div>
  );
};
export default ErrorPage;
