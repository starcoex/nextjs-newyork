import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="nav_containter">
      <Link href="/">
        <span>Home</span>
      </Link>
      <Link href="/about">
        <span>About</span>
      </Link>
      <style jsx>{`
        .nav_containter {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
         {
          /* a {
          text-decoration-line: none;
        } */
        }
      `}</style>
    </div>
  );
}
