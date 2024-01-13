import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { products } from "./Products";

const Home = (props) => {
  // Using state to update search value
  const [search, setSearch] = useState("");

  // Using this function for user friendly output as the navCategory state is all lowercase
  const capitalizeFirstLetter = (word) => {
    return word.replace(word[0], word[0].toUpperCase());
  };

  // Using navCategory state to filter the product array
  let filteredProducts = products.filter((product) => {
    return product.keywords.includes(props.navCategory);
  });

  // Changing the viewItem state on App component
  const setItem = props.changeViewItem;
  const handleSetItem = (item) => {
    setItem(item);
  };

  return (
    <section className="mx-auto w-[99%] md:w-[90%]">
      <div className="relative mb-8 mt-4 flex">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-full p-2 outline-none ring-rose-500 duration-300 ease-in-out hover:shadow-lg focus:shadow-lg focus:ring md:p-4 md:text-lg"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <CiSearch className="text-2xl md:text-4xl" />
        </button>
      </div>
      <h1 className="mx-2 rounded-sm text-3xl font-bold text-gray-800">
        {"Category: " + capitalizeFirstLetter(props.navCategory)}
      </h1>
      <div className="mx-2 mb-12 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts
          .filter((product) => {
            return product.name
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase());
          })
          .map((product, index) => (
            <div
              className="flex flex-col rounded-md bg-white p-4 duration-300 ease-in-out hover:-translate-y-[0.25rem] hover:shadow-lg"
              key={index}
            >
              <h2 className="text-gray-900 md:text-lg">{product.name}</h2>
              <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
                ${product.price}
              </h2>
              <img
                className="my-2 h-full rounded-md"
                src={product.img}
                alt={`Image for ${product.name}`}
              />
              <Link
                className="w-fit rounded-full border-2 border-rose-500 bg-rose-500 p-2 uppercase text-white duration-300 ease-in-out hover:bg-transparent hover:text-gray-900"
                onClick={() => {
                  handleSetItem(product);
                }}
                to={"/ViewItem"}
              >
                View item
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Home;
