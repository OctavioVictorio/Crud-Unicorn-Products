import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductView from "./ProductView";
import ProductForm from "./ProductForm";

const ProductsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductView />} />
      <Route path="/nuevo" element={<ProductForm />} />
      <Route path="/editar/:id" element={<ProductForm />} />
    </Routes>
  );
};

export default ProductsRoutes;
