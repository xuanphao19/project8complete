import React from "react";
import { useState, memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";

import { toggleFavorite } from "@/vendor";
import { Image } from "@/assets/images/";
import { IconSvg } from "@/component/";

const CategoriesCards = memo(
  ({
    id,
    to = "",
    src = "",
    colClass,
    cardClass,
    thumbClass,
    linkClass,
    imgClass,
    contentClass,
    dataDetail,
    iconLiked,
    cardTitle,
    cardBody,
    handleLinkClick,
  }) => {
    handleLinkClick = handleLinkClick ? handleLinkClick : () => {};
    const dispatch = useDispatch();
    const data = useSelector((state) => state.app.data);
    const [productDetail, setProductDetail] = useState(dataDetail);

    const CardTitle = cardTitle ? cardTitle : null;
    const CardBody = cardBody ? cardBody : null;
    const cardImgClass = `card-img${imgClass ? ` ${imgClass}` : ""}`;
    const thumbLinkClass = `thumb-link${linkClass ? ` ${linkClass}` : ""}`;
    const cardThumbClass = `card-thumbs${thumbClass ? ` ${thumbClass}` : ""}`;

    const handleLikedClick = async (event, product) => {
      event.preventDefault();
      product = { ...product, isLiked: !product.isLiked };
      await dispatch(toggleFavorite(product));
      setProductDetail(product);
    };

    return (
      <Col className={`card-contain${colClass ? ` ${colClass}` : ""}`}>
        <article
          id={id}
          className={`card-item ${cardClass ? ` ${cardClass}` : ""}`}>
          <div className={cardThumbClass}>
            <Link
              to={to}
              onClick={handleLinkClick}
              className={thumbLinkClass}>
              <Image
                className={cardImgClass}
                src={src}
                alt="Product Image"
              />
            </Link>

            {iconLiked && (
              <span
                onClick={(event) => handleLikedClick(event, productDetail)}
                className="card-favourite flex-center position-absolute shadow cursor-pointer z-3">
                <IconSvg
                  className={`${productDetail.isLiked ? "heart-red fs-11" : "heart mt-1 fs-11"} z-9`}
                  link={`${productDetail.isLiked ? "heart-red" : "heart"}`}
                />
              </span>
            )}
          </div>

          <div className={`card-content${contentClass ? ` ${contentClass}` : ""}`}>
            {cardTitle && <CardTitle />}
            {cardBody && <CardBody />}
          </div>
        </article>
      </Col>
    );
  },
);

export default CategoriesCards;
