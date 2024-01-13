import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiBars4 } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa";

const Navbar = (props) => {
  // Array of categories
  const categoryLinks = [
    {
      title: "Categories",
      dropdowns: [
        "All",
        "Apparel",
        "Electronics",
        "Gaming",
        "Beauty",
        "Home Decor",
        "Others",
      ],
    },
  ];

  // Array of other nav links
  const otherLinks = ["Sell", "Shipping"];

  // Changing the navCategory state on App component
  const setCategory = props.changeNavCategory;
  const changeCategory = (category) => {
    setCategory(category);
  };

  // Show/hide navbar on clicking hamburger menu on mobile devices
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav(!showNav);
  };

  // Show/hide category list on clicking the category button from mobile nav
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const toggleMobileDropdown = () => {
    setShowMobileDropdown(!showMobileDropdown);
  };

  // Hide the mobile nav whenever navCategory state is changed
  useEffect(() => {
    setShowNav(false);
    setShowMobileDropdown(false);
  }, [props.navCategory]);

  return (
    <>
      <nav className="mx-auto mt-2 flex h-16 w-[99%] items-center justify-between rounded-full bg-white p-2">
        <Link
          className="grid h-12 w-12 cursor-pointer place-content-center rounded-full border-2 border-rose-500 bg-rose-500 p-2 text-2xl text-white duration-300 ease-in-out hover:bg-white hover:text-gray-900"
          to={"/"}
        >
          X
        </Link>
        <div className="hidden items-center gap-4 text-gray-900 md:flex">
          {categoryLinks.map((item, i) => (
            <div className="group relative" key={i}>
              <Link className="rounded-full p-2 text-xl uppercase tracking-wider duration-300 ease-in-out hover:bg-rose-500 hover:text-white">
                {item.title}
              </Link>
              <div className="absolute z-10 hidden pt-6 group-hover:block">
                <ul className="rounded-md bg-white p-2 shadow-md">
                  {item.dropdowns.map((dropdown, i) => (
                    <li
                      key={i}
                      className="cursor-pointer border-b border-rose-500 p-2 text-lg hover:text-rose-500"
                      onClick={() => {
                        changeCategory(dropdown.toLowerCase());
                      }}
                    >
                      {dropdown}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          {otherLinks.map((item, i) => (
            <Link
              className="rounded-full p-2 text-xl uppercase tracking-wider duration-300 ease-in-out hover:bg-rose-500 hover:text-white"
              key={i}
            >
              {item}
            </Link>
          ))}
          <Link
            className="grid cursor-pointer place-content-center rounded-full border-2 border-rose-500 bg-rose-500 p-2 text-xl tracking-wider text-white duration-300 ease-in-out hover:bg-white hover:text-gray-900"
            to={"/ViewCart"}
          >
            VIEW CART
          </Link>
        </div>
        <div className="mx-2 text-3xl md:hidden" onClick={toggleNav}>
          {showNav ? <RxCross1 /> : <HiBars4 />}
        </div>
      </nav>
      <div
        className={`fixed inset-0 z-10 h-screen w-[70%] rounded-r-[2rem] bg-rose-500 px-6 py-12 text-2xl text-gray-900 duration-300 ease-in-out ${
          showNav ? "left-0" : " -left-full"
        }`}
      >
        {categoryLinks.map((item, i) => (
          <div key={i} className="flex flex-col">
            <Link
              className={`mb-px flex items-center justify-between bg-white p-2 focus:text-rose-500 ${
                showMobileDropdown ? "rounded-t-md" : "rounded-md"
              }`}
              onClick={toggleMobileDropdown}
            >
              <span>{item.title}</span>
              <span
                className={`duration-200 ease-in-out ${
                  showMobileDropdown ? "rotate-180" : "rotate-0"
                }`}
              >
                <FaChevronDown />
              </span>
            </Link>
            <ul
              className={`rounded-b-md bg-white p-2 ${
                showMobileDropdown ? "block" : "hidden"
              }`}
            >
              {item.dropdowns.map((dropdown, i) => (
                <li
                  key={i}
                  onClick={() => {
                    changeCategory(dropdown.toLowerCase());
                  }}
                >
                  {dropdown}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {otherLinks.map((item, i) => (
          <Link
            className="my-2 block rounded-md bg-white p-2 focus:text-rose-500"
            key={i}
          >
            {item}
          </Link>
        ))}
        <Link
          to={"/ViewCart"}
          className="my-2 block rounded-md bg-white p-2 focus:text-rose-500"
        >
          View Cart
        </Link>
      </div>
    </>
  );
};

export default Navbar;
