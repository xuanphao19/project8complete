import React, { useState, useEffect, useMemo, memo } from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";

import { getRandomItems } from "@/utils";
import { fetchData, fetchRandomItems } from "@/api";

import { IconSvg, MainSection, MultiLevelMenu as ConsecutiveMenu, CategoriesCards, Loading } from "@/component/";

const loader = async ({ params }) => {
  try {
    const id = params?.paramId;
    const loaderData = await fetchData("productsData", id);
    return loaderData;
  } catch (error) {
    console.log("Error in loader Products:", error);
    return;
  }
};

const ProductHeader = () => {
  return (
    <div className="container bg-body py-4 text-center">
      <div className="section-title">
        <h2 className="d-inline-flex py-3 px-4 fs-3 text-primary bg-primary bg-opacity-10 rounded-pill">Products</h2>
        <h3 className="py-3">
          <span className="fs-2 fw-semibold text-uppercase text-primary">Our products</span>
        </h3>
        <p className="m-auto mb-4 col col-md-8 col-lg-6 col-xxl-5 fs-4 fw-lighter text-body">
          Our products Lorem ipsum dolor sit. Temporibus corporis, aperiam laudantium libero assumenda mollitia aliquid!
        </p>
      </div>
    </div>
  );
};

const ProductPage = memo(() => {
  const { pathname } = useLocation();
  const [path, setPath] = useState("/products");
  const [itemPath, setItemPath] = useState([]);
  const data = useSelector((state) => state.app.data);
  const [products, setProducts] = useState([]);
  const matchProduct = useMatch("/products");
  const checkoutAll = useMatch("products/checkout/all");
  const matchCheckout = useMatch("/products/checkout");
  const matchPay = useMatch("/products/checkout/shipping/payment");

  useEffect(() => {
    (async () => {
      const randomProduct = await fetchRandomItems("productsData", 8);
      setProducts([randomProduct]);
    })();
  }, []);

  useEffect(() => {
    if (pathname === "/products") setPath("/products");
    setItemPath(pathname.split("/"));
  }, [pathname]);

  useEffect(() => {
    const handleScroll = async () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      if (matchProduct && scrollTop + clientHeight >= scrollHeight - 300) {
        const data = await fetchRandomItems("productsData", 4);
        setProducts((prev) => [...prev, data]);
      }
    };

    if (matchProduct && products.length < 50) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [matchProduct, products]);

  useEffect(() => {
    if (matchCheckout) setProducts([getRandomItems(4, data)]);
  }, [matchCheckout]);

  const renderProduct = useMemo(() => {
    if (products.length > 0)
      return products?.map((items, i) => (
        <Row
          key={i}
          className={`product-row0${i + 1} group-items synthetic mt-1 row-cols-1 row-cols-md-4 g-5 py-4 row-gap-5`}>
          {items?.map((product) => {
            return (
              <React.Fragment key={`product${product.id}`}>
                <CategoriesCards
                  dataDetail={product}
                  iconLiked={true}
                  id={`product0${i + 1}-${product.id}`}
                  to={pathname?.match("/products") ? `${path}/${product.id}/details` : path}
                  colClass="col-10 col-sm-6 mx-auto"
                  cardClass="d-flex flex-column justify-content-between bg-secondary-subtle border border-black border-opacity-10 overflow-hidden rounded-5 shadow"
                  thumbClass="position-relative pt-100 rounded-top-5"
                  linkClass="position-absolute inset-full flex-center p-4 border-bottom"
                  imgClass="object-fit-contain rounded-4"
                  src={`/assets/images/product/product${product.id}.png`}
                  contentClass="w-100 py-4 d-flex flex-column justify-content-between flex-grow-1"
                  cardTitle={() => <h3 className="card-title text-body text-opacity-75">{`${product.desc}`}</h3>}
                  cardBody={() => (
                    <div>
                      <span className="brand text-body text-opacity-50 fst-italic">{`${product.brand}`}</span>
                      <div className="card-assess d-flex align-items-center justify-content-between text-body text-opacity-75">
                        <span className="price fw-medium">{`$10 - $${product.price}`}</span>
                        <span className="d-flex align-items-center gap-2">
                          <span className="star">
                            <IconSvg
                              className="text-warning pb-1"
                              link="star-full"
                            />
                          </span>
                          <span>{`${product.star}`}</span>
                        </span>
                      </div>
                    </div>
                  )}
                />
              </React.Fragment>
            );
          })}
        </Row>
      ));
  }, [products]);

  if (!data || data.length <= 0 || products.length <= 0) {
    return <Loading className="vh-60 flex-center" />;
  }

  return (
    <MainSection
      id="product"
      className="container py-6"
      name="section">
      {pathname.match("/products") && (
        <React.Fragment>
          {!pathname.includes("details") && (
            <ConsecutiveMenu
              itemPath={itemPath}
              pathname={pathname}
              className="py-3 bg-info bg-opacity-02 shadow-sm"
            />
          )}
          <Outlet context={"name"} />
        </React.Fragment>
      )}
      {checkoutAll || matchPay ? null : renderProduct}
    </MainSection>
  );
});

export { loader, ProductHeader };
export default ProductPage;
