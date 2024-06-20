// Em đã đi qua nơi đâu?
import { Outlet, useNavigation, Link } from "react-router-dom";
import { Navigation } from "@component";

const HistoryPage = () => {
  const navigation = useNavigation();
  return (
    <>
      <h1>Lịch sử Của công ty</h1>
      <Navigation
        links={[
          { path: "/", name: "⭐⭐⭐" },
          { path: "register", name: "⭐Register⭐" },
          { path: "about/history/editor", name: "🌻🌼⭐🚗⭐" },
          { path: "about/history/events_s", name: "🌻🌼💥💥events💥" },
          { path: "team", name: "🌻Đội Nhóm🌼" },
        ]}
      />
      <button
        type="button"
        className="btn btn-primary fs-2 py-3 px-5"
        data-bs-toggle="modal"
        data-bs-target="#ariaModal">
        Launch modal
      </button>

      <section className="history rou">
        <div
          id="history-content"
          className={navigation.state === "loading" ? "loading" : ""}>
          <h2>"History"</h2>
          <p className="fs-1 bg-black text-end p-2 m-0 text-opacity-25">bg-black text-body</p>
          <p className="fs-1 bg-success-subtle text-end p-2 m-0 text-body">bg-black text-body</p>
          <p className="fs-1 bg-body text-end p-2 m-0 text-break">bg-body text-break</p>
          <p className="fs-1 bg-body-secondary text-end p-2 m-0 text-capitalize">bg-body-secondary text-capitalize</p>
          <p className="fs-1 bg-body-tertiary text-end p-2 m-0 text-body-emphasis">bg-body-tertiary text-body-emphasis</p>
          <p className="fs-1 bg-danger text-end p-2 m-0 text-body-secondary">bg-danger text-body-secondary</p>
          <p className="fs-1 bg-danger-subtle text-end p-2 m-0 text-body-tertiary">bg-danger-subtle text-body-tertiary</p>

          <p className="fs-1 bg-dark text-end text-end p-2 m-0 text-warning">bg-dark text-warning</p>
          <p className="fs-1 bg-dark-subtle text-end p-2 m-0 text-black">bg-dark-subtle text-black</p>
          <p className="fs-1 bg-gradient text-end p-2 m-0 text-opacity-50">bg-gradient text-black-50</p>
          <p className="fs-1 bg-info text-end p-2 m-0 text-secondary">text-bg-secondary</p>
          <p className="fs-1 bg-info-subtle text-end p-2 m-0 text-success text-opacity-75">text-bg-success</p>
          <p className="fs-1 fw-bold text-end p-2 m-0 text-success text-opacity-75">text-success</p>
          <p className="fs-1 text-end p-2 m-0 text-body bg-success bg-opacity-10">text-body-secondary bg-info bg-opacity-10</p>
          <p className="fs-1 bg-success bg-opacity-10 bg-gradient text-end p-2 m-0 text-opacity-50">bg-gradient text-black-50</p>

          <Outlet />
        </div>
      </section>
    </>
  );
};
export default HistoryPage;

// https://github.com/WI1IN/project-htmlcss-08
