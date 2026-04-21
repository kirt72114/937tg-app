"use client";

import Link, { type LinkProps } from "next/link";
import { forwardRef } from "react";

type NavLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  Pick<LinkProps, "prefetch"> & {
    href: string;
  };

function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  function NavLink({ href, prefetch, ...rest }, ref) {
    if (isExternal(href)) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        />
      );
    }
    return <Link ref={ref} href={href} prefetch={prefetch} {...rest} />;
  }
);
