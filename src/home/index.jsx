import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeView from "./HomeView";

const IndexRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
    </Routes>
  );
};

export default IndexRoutes;
