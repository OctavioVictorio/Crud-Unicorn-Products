import React from "react";
import { Routes, Route } from "react-router-dom";
import UnicornView from "./UnicornView";
import UnicornForm from "./UnicornForm";

const UnicornsModule = () => {
  return (
    <Routes>
      <Route path="/" element={<UnicornView />} />
      <Route path="/crear" element={<UnicornForm />} />
      <Route path="/editar/:id" element={<UnicornForm />} /> 
    </Routes>
  );
};

export default UnicornsModule;
