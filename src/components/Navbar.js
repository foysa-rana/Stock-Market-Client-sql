import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <nav className="relative select-none bg-grey lg:flex lg:items-stretch w-full">
        <div className="container mx-auto flex flex-no-shrink items-stretch h-12">
          <NavLink
            to="/"
            className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
          >
            Stock Market
          </NavLink>
          <NavLink
            to="/"
            className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
          >
            Home
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
