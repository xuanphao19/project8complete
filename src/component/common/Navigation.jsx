import React from "react";
import { NavLink, Link, useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image } from "@/assets/images/";
import { IconSvg } from "@/component";
import { Nav } from "react-bootstrap";

const ItemMenu = ({ type = "nav", item, path, linkClass, icons, subIcon, children, isLink = false, onClick }) => {
  onClick = onClick ? onClick : () => {};
  let ItemLink = path && !item.children ? NavLink : "span";
  ItemLink = isLink ? NavLink : ItemLink;

  return (
    <ItemLink
      role={ItemLink !== "span" ? "link" : null}
      className={`${!item.children ? `${type === "nav" ? "nav-link" : "item-link"}` : `title ${type}-title`}${linkClass ? ` ${linkClass}` : ""}`}
      to={path && ItemLink !== "span" ? path : null}
      onClick={onClick}>
      {children ? <span className="item-text text-nowrap pe-3">{children}</span> : null}
      {icons ? icons : null}
      {subIcon ? subIcon : null}
    </ItemLink>
  );
};

const Navigation = ({ type = "nav", links, navClass, className, itemClass, linkClass, iconClass, icons, subIcon, onClick, ...prop }) => {
  const user = useSelector((state) => state.app.user);
  const { productsData } = useRouteLoaderData("root");
  const ListItem = type === "nav" ? "ul" : "div";
  const Items = ListItem === "ul" ? "li" : "div";
  links = links ? links : productsData?.Grocery;

  if (!productsData) return;

  return (
    <Nav className={navClass}>
      <ListItem className={`${type}-group${className ? ` ${className}` : ""}`}>
        {links &&
          links.length > 0 &&
          links.map((link, index) => {
            const hidden = link.type && link.type === "private" && !user.isVip;
            const keys = `${index}${link.id ? link.id : "-01"}`;
            const paths = link.path ? link.path : `${link.id}/fastfilter`;
            icons = link.id && (
              <Image
                className={iconClass}
                src={`/assets/images/product/product${link.id}.png`}
              />
            );
            return (
              !hidden && (
                <Items
                  key={keys}
                  className={`${type}-item${itemClass ? ` ${itemClass}` : ""}`}>
                  <ItemMenu
                    item={link}
                    path={paths}
                    isLink={true}
                    linkClass={linkClass}
                    icons={icons ? icons : null}
                    subIcon={subIcon ? subIcon : null}
                    onClick={onClick}
                    {...prop}>
                    {link.name}
                  </ItemMenu>
                </Items>
              )
            );
          })}
      </ListItem>
    </Nav>
  );
};

const MenuLists = ({
  items,
  type,
  to = "",
  className,
  itemClass,
  linkClass,
  iconClass,
  subIconClass,
  icons,
  subIcon,
  finalPoint,
  children,
  onClick,
  isMultiLink = true,
}) => {
  const ListItem = type === "nav" ? "ul" : "div";
  const Items = ListItem === "ul" ? "li" : "div";

  return (
    <ListItem className={`${type}-group${className ? ` ${className}` : ""}`}>
      {items.map((item, index) => {
        if (!item) return;
        const keys = `${index}02${item.id ? item.id : "-02"}`;
        let path = `${to ? to : item.to ? item.to : item.id ? `/${item.id}/${finalPoint ? finalPoint : ""}` : ""}`;
        path = item.name === "Shop All" ? "products" : path;
        return (
          <Items
            key={keys}
            className={`${type}-item${itemClass ? ` ${itemClass}` : ""}`}>
            <ItemMenu
              type={type}
              item={item}
              path={path}
              icons={
                item.iconUrl && (
                  <IconSvg
                    className={iconClass ? iconClass : ""}
                    link={item.iconUrl}
                  />
                )
              }
              subIcon={
                item.subIconUrl && (
                  <IconSvg
                    className={`${subIconClass ? `${subIconClass}` : ""}`}
                    link={item.subIconUrl}
                  />
                )
              }
              itemClass={itemClass}
              linkClass={linkClass}
              onClick={item.isMultiLink === false ? item.isMultiLink : isMultiLink && onClick}>
              {item.name}
            </ItemMenu>
            {item.children && (
              <MenuLists
                type={type}
                icons={icons}
                subIcon={subIcon}
                subIconClass={subIconClass}
                className={`sub-menu${className ? ` ${className}` : ""}`}
                linkClass={linkClass}
                finalPoint={finalPoint}
                items={item.children}
                children={children}
                onClick={item.isMultiLink === false ? item.isMultiLink : isMultiLink && onClick}
              />
            )}
          </Items>
        );
      })}
    </ListItem>
  );
};

const MultiLevelMenu = ({ itemPath = [], pathname, classContent, className, classLink, ...props }) => {
  let path = "";

  return (
    <React.Fragment>
      <div className={`multi-level-menu d-flex mb-5${className ? ` ${className}` : ""}`}>
        <div className={classContent}>
          {itemPath.map((item, index) => {
            path += index < itemPath.length - 1 ? `${item}/` : `${item}`;
            item = path === "/" ? "Home" : item;
            return (
              <Link
                to={`${path}`}
                key={item + index}
                className={`multi-menu text-capitalize px-4 py-2${path === pathname ? " active" : ""}${classLink ? ` ${classLink}` : ""}`}
                {...props}>
                {item}
              </Link>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export { Navigation, MenuLists, MultiLevelMenu };
