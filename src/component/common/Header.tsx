import React, { forwardRef, useRef } from "react";
import { memo } from "react";
import { Container } from "react-bootstrap";

interface HeaderProps {
  headerId?: string;
  className?: string;
  children?: React.ReactNode;
  [propName: string]: unknown;
}

const Header = forwardRef<HTMLHeadingElement, HeaderProps>(({ headerId, className, children, ...props }, ref) => {
  const headRef = useRef(null);
  headerId = headerId ? headerId : "site";

  return (
    <header
      ref={ref}
      id={`header${headerId ? `-${headerId}` : ""}`}
      className={`header-${headerId} w-100 top-0 flex-center${className ? ` ${className}` : ""}`}
      {...props}>
      <div className="bgr-header position-absolute top-0 start-0 w-100 h-100 z-n1"></div>
      <Container className="flex-center">{children}</Container>
    </header>
  );
});

export default memo(Header);
