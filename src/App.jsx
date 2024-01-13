import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ViewItem from "./components/ViewItem";
import ViewCart from "./components/ViewCart";

const App = () => {
  // Using state to set the category of products to display on Home component, state function is being passed to Navbar componet to update the state
  const [navCategory, setNavCategory] = useState("all");
  const changeNavCategory = (category) => {
    setNavCategory(category);
  };

  // Using state to set the details of products to display on ViewItem component, state function is being passed to Home component to update the state
  const [viewItem, setViewItem] = useState({});
  const changeViewItem = (item) => {
    setViewItem(item);
  };

  // Using state to add products to cart to display on ViewCart component, state function is being passed to ViewItem component to update the state
  const [cartItem, setcartItem] = useState({});
  const changecartItem = (item) => {
    setcartItem(item);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-rose-100">
      <Routes>
        <Route
          path={"/"}
          element={
            <>
              <Navbar
                changeNavCategory={changeNavCategory}
                navCategory={navCategory}
              />
              <Home changeViewItem={changeViewItem} navCategory={navCategory} />
            </>
          }
        />
        <Route
          path={"/ViewItem"}
          element={
            <ViewItem content={viewItem} changecartItem={changecartItem} />
          }
        />
        <Route path={"/ViewCart"} element={<ViewCart content={cartItem} />} />
      </Routes>
    </div>
  );
};

export default App;
