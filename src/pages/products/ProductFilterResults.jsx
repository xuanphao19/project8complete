import React, { Fragment, useState, useEffect, memo } from "react";
import Row from "react-bootstrap/Row";
import { useLoaderData } from "react-router-dom";
import { IconSvg, CategoriesCards, Loading } from "@/component/";

const ProductResults = () => {
  // FastFilter Product Results!
  const filterData = useLoaderData();
  const [products, setProducts] = useState(filterData);

  useEffect(() => {
    setProducts(filterData);
  }, [filterData]);

  if (!products || products.length <= 0) {
    return <Loading className="vh-60 flex-center" />;
  }

  return (
    <Fragment>
      <div className="fast-filter-result p-3">
        <h2 className="m-0 p-2 fs-5 fst-italic text-body text-opacity-50">Product Result</h2>

        <Row className="group-items fast-filter row-cols-1 row-cols-md-4 row-cols-lg-3 row-cols-xl-4 row-gap-5 g-4 py-3">
          {products &&
            products.map((product) => (
              <Fragment key={`fast-filter${product.id}`}>
                <CategoriesCards
                  iconLiked={true}
                  dataDetail={product}
                  id={`details${product.id}`}
                  to={`/products/${product.id}/details`}
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
              </Fragment>
            ))}
        </Row>
      </div>
    </Fragment>
  );
};

export default memo(ProductResults);
