import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";

const ViewCart = (props) => {
  const content = props.content;

  let oldCartItems = JSON.parse(localStorage.getItem("ViewCart_data"));

  let cartItems = [];

  if (oldCartItems !== null) {
    // All the previously saved objects will be passed to new array
    cartItems.push(...oldCartItems);
  }

  // This function is used to check if products array(contnet) was passed while visiting this page or not
  const isEmpty = (object) => {
    return JSON.stringify(object) === "{}";
  };

  const [pageContent, setPageContent] = useState([]);

  const saveData = (data) => {
    localStorage.setItem("ViewCart_data", JSON.stringify(data));
  };

  useEffect(() => {
    if (!isEmpty(content)) {
      if (cartItems.length === 0) {
        // Both localStorage and cartItems array are empty, so simply add new object
        cartItems.push(content);
      } else {
        // If cartItem is not empty, check if new object already exist
        let isSameItem = cartItems.some((item) => {
          if (JSON.stringify(item) === JSON.stringify(content)) {
            return true;
          }
          return false;
        });
        if (!isSameItem) {
          cartItems.push(content);
        }
      }
      saveData(cartItems);
    }
  }, []);

  // This state is being passed to the useEffect as dependency below, used to make the page re-render whenever any product is removed off the cart
  const [itemRemoveCounter, setItemRemoveCounter] = useState(0);

  useEffect(() => {
    setPageContent(JSON.parse(localStorage.getItem("ViewCart_data")));
  }, [itemRemoveCounter]);

  const removeItem = (item) => {
    let updatedCartItems = oldCartItems.filter((oldCartItem) => {
      return JSON.stringify(oldCartItem) !== JSON.stringify(item);
    });
    saveData(updatedCartItems);

    // Update the state to make the page re-render
    setItemRemoveCounter((itemRemoveCounter) => itemRemoveCounter + 1);
  };

  // This function is used to conditionally render pageContent or error message accordingly
  const isCartEmpty = () => {
    if (pageContent !== null) {
      return pageContent.length !== 0 ? true : false;
    } else return false;
  };

  return (
    <section className="flex h-screen items-center justify-center">
      <div className="mx-auto h-4/5 w-11/12 rounded-md bg-white px-4 py-12 text-gray-900 md:w-2/3">
        <div className="px-6 pb-4">
          <h1 className="w-full rounded-md bg-rose-500 px-4 py-2 text-center font-semibold uppercase text-white sm:text-2xl md:text-3xl">
            {isCartEmpty() === true
              ? "Checkout your cart"
              : "No items found in cart"}
          </h1>
        </div>
        <div className="h-4/5 overflow-y-auto px-6 py-3">
          {isCartEmpty() === true ? (
            pageContent.map((item, i) => (
              <div
                key={i}
                className="relative my-4 flex w-full justify-between rounded-md bg-gray-100 shadow-md"
              >
                <div className="flex flex-grow items-center md:flex-grow-0">
                  <img
                    src={item.img}
                    className="h-20 w-auto rounded-l-md rounded-r-md sm:h-24 md:h-36 md:rounded-r-none"
                    alt={`Image for ${item.name}`}
                  />
                </div>
                <div className="flex flex-grow flex-row-reverse items-center justify-between px-2 md:flex-row md:px-6">
                  <ul className="hidden text-2xl font-semibold md:block">
                    <li className="md:py-1">Product: </li>
                    <li className="md:py-1">Quantity: </li>
                    <li className="md:py-1">Price: </li>
                  </ul>
                  <ul className="text-right font-semibold sm:text-lg md:text-2xl md:font-normal">
                    <li className="md:py-1">{item.name}</li>
                    <li className="md:py-1">{`x${item.quantity}`}</li>
                    <li className="md:py-1">{`$${
                      item.quantity * item.price
                    }`}</li>
                  </ul>
                </div>
                <div
                  className="absolute -right-2 -top-2"
                  onClick={() => {
                    removeItem(item);
                  }}
                >
                  <MdCancel className="cursor-pointer rounded-full bg-white text-xl text-rose-500 duration-300 ease-in-out hover:text-rose-600 md:text-3xl" />
                </div>
              </div>
            ))
          ) : (
            <div className="grid h-full place-items-center text-gray-400">
              <FiAlertCircle className="h-48 w-auto flex-shrink sm:h-72 md:h-80" />
            </div>
          )}
        </div>
        {isCartEmpty() === true && (
          <div className="flex w-full">
            <button className="mx-auto mt-4 w-fit rounded-full border-2 border-rose-500 bg-rose-500 p-2 uppercase text-white duration-300 ease-in-out hover:bg-transparent hover:text-gray-900">
              Place order
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewCart;
