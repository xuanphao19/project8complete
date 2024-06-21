// router.tsx
import React from 'react';
import { Route } from 'react-router-dom';

import { layoutSwitcher } from '@/layout';
import Root, { loader as rootLoader } from './Root';

import { HomePage, InviteLogIn, ErrorPages, Welcome } from '@/pages';

interface UI {
  id?: string;
  path: string;
  layout?: string | null;
  access?: string;
  history?: History | null;
  fallbackElement?: any;
  component: () => React.JSX.Element;
  loader?: React.FC;
  action?: React.FC; // ReactFC history/editor
  children?: UI[];
}

const nestedRoutes = (isVip: boolean, data: UI[]): JSX.Element => {
  return (
    <Route
      id='root'
      path={'/'}
      element={<Root />}
      // errorElement={<ErrorPages />}
      loader={rootLoader}
    >
      {data.map((page, i) => {
        const Layouts: React.JSX.Element = layoutSwitcher(page.layout);
        const childrenPages = isVip && page.children && page.children;
        const Pages = page.component;
        const path = !page.access ? page.path : page.access === 'private' && isVip ? page.path : '';
        const loader = page.loader;
        const action = page.action;
        return (
          <Route
            key={`${i}`}
            id={page.id ? `layouts-${page.id}` : null}
            element={Layouts}
            loader={loader}
            action={action}
          >
            <Route
              index={true}
              element={<HomePage />}
            />
            <Route
              id={page.id ? `${page.id}` : `${page.path}`}
              path={path}
              // errorElement={<ErrorPages />}
              element={<Pages />}
              loader={loader}
              action={page.action}
            >
              {childrenPages && generateRoutes(childrenPages)}
            </Route>
          </Route>
        );
      })}
      {/* <Route
        path="*"
        element={!isVip ? <InviteLogIn /> : <Welcome />}
      /> */}
    </Route>
  );
};

const generateRoutes = (childrenPages: UI[]): JSX.Element[] => {
  return childrenPages.map((page) => {
    const Page = page.component;
    return (
      <Route
        id={page.id ? `${page.id}` : `${page.path}`}
        key={page.path}
        path={page.path}
        element={<Page />}
        loader={page.loader}
        action={page.action}
      >
        {page.children && generateRoutes(page.children)}
      </Route>
    );
  });
};

export default nestedRoutes;

/*
// id = "root";
// loader={() => fetchUser()}
// const user = useRouteLoaderData("root"); Tương đương Globals Context
// Các tuyến chỉ mục hiển thị ở đầu ra của tuyến gốc tại đường dẫn của tuyến gốc.

Để giữ cho các gói ứng dụng của bạn có kích thước nhỏ và hỗ trợ việc tách mã các tuyến đường của bạn, mỗi tuyến đường có thể cung cấp một chức năng không đồng bộ để giải quyết các phần không khớp với tuyến đường trong định nghĩa tuyến đường của bạn ( loader, action, Component/ element, ErrorBoundary/ errorElement, v.v.).
Mỗi lazy hàm thường sẽ trả về kết quả của quá trình nhập động.

// tuyến đường lười biếng :::::
let routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="a" lazy={() => import("./a")} />
    <Route path="b" lazy={() => import("./b")} />
  </Route>
);

Sau đó, trong mô-đun tuyến đường lười biếng của bạn, hãy xuất các thuộc tính bạn muốn xác định cho tuyến đường:

* * *
Việc bỏ qua đường dẫn sẽ khiến tuyến đường này trở thành "tuyến đường bố cục". Nó tham gia lồng ghép giao diện người dùng nhưng không thêm bất kỳ phân đoạn nào vào URL. Phải đảm bảo Outlet!
<Route path="/" element={<Home />}>
  <Route key={key} element={<Layout />}>
    <Route index element={<IndexHome />} />
    <Route path="/teams" element={<Teams />}>
      <Route index element={<TeamsIndex />} />
      <Route path=":teamId" element={<Team />} />
    </Route>
  </Route>
  <Route path="*" element={<Welcome />} />
</Route>

*/

/*
// Gửi dữ liệu đi từ input form!
import { useSubmit, Form } from "react-router-dom";

function SearchField() {
  let submit = useSubmit();
  return (
    <Form
      onChange={(event) => {
        submit(event.currentTarget);
      }}
    >
      <input type="text" name="search" />
      <button type="submit">Search</button>
    </Form>
  );
}
reloadDocument
<Link reloadDocument></Link>
<NavLink reloadDocument></NavLink>
Thuộc tính này reloadDocumentcó thể được sử dụng để bỏ qua việc định tuyến phía máy khách và để trình duyệt xử lý quá trình chuyển đổi một cách bình thường (như thể nó là một <a href>).

*/
/*
function MatchPath({ path="/products", Comp }) {
  const match = useMatch(path);
  return match ? <Comp {...match} /> : null;
}
// Sẽ match ở bất cứ đâu mà không cần thiết phải ở trong `<Routes>`
<MatchPath path="/accounts/:id" Comp={Account} />;
*/

/*
function loader({ request, params }) {
  const data = { some: "thing" };
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json; utf-8",
    },
  });
}
 ("đăng", "đặt", "vá", "xóa")
*/

/*
const match = useMatch("/products");
const matchHome = useMatch("/");

// match Nhận được toàn bộ dữ liệu tuyến
// đến useMatch("/products"); trước khi hiển thị
  // đường sau khi đã chuyển hướng thành công
  // Chỉ các Comp cùng trên tuyến mới có thể nhận

// const matches = useMatches();
// matches Nhận toàn bộ thông tin
  // của tuyến đường ở mọi nơi useMatches()
  // Comp không cùng tuyến có thể nhận
*/
/*

  const matched = pathname.match("/products");
  const matchPath = isLSOP.some((path) => path === pathname);
  const exactly = location.pathname.includes("/fastfilter");
💔 match 💔: Là một phương thức của đối tượng RegExp (Regular Expression) dùng để so khớp một chuỗi với biểu thức chính quy. Nó trả về một đối tượng RegExpMatchObject chứa thông tin về các phần khớp.
💔 some: 💔 Là một phương thức của đối tượng Array dùng để kiểm tra xem liệu có ít nhất một phần tử trong mảng thỏa mãn điều kiện do hàm cung cấp hay không. Nó trả về true nếu có ít nhất một phần tử thỏa mãn, và false nếu không có.
💔 includes 💔: Là một phương thức của đối tượng String dùng để kiểm tra xem một chuỗi con có xuất hiện trong chuỗi gốc hay không. Nó trả về true nếu chuỗi con xuất hiện, và false nếu không xuất hiện.

⭐ const regex = /products/; //=> RegExpMatchObject
  const match = pathname.match(regex);
  const regex = /products\/[a-z]+\/\d+/;
  const match = pathname.match(regex);
  console.log(match); // Output: ["products/category/123"]
⭐ const numbers = [1, 2, 3, 4]; //=> Boolean
  const even = numbers.some(num => num % 2 === 0);
  const hasCategory = pathname.split("/").some(part => part === "category");
  console.log(hasCategory); // Output: true
⭐ const str = "This is a string"; //=> Boolean
  const hasFast = str.includes("/fastfilter");
*/
// routes.js
/*
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import MyComponent from "@/Component";
// import TargetPage from "@/Component/";

// const actionHandler = async ({ request }) => {
//   const formData = await request.formData();
//   const myInputValue = formData.get("myInput");
//   // Xử lý dữ liệu form ở đây (ví dụ: gửi lên server, cập nhật state,...)
//   console.log("Submitted value:", myInputValue);
//   return { myInputValue };
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MyComponent />,
//     children: [
//       {
//         path: "target-path",
//         element: <TargetPage />,
//         action: actionHandler,
//       },
//     ],
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;
 */
