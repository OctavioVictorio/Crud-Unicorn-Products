import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnicornRoutes from "./unicorns";
import { UnicornProvider } from "./context/UnicornContext";
import ProductsRoutes from "./products";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/unicornios/*"
          element={
            <UnicornProvider>
              <UnicornRoutes />
            </UnicornProvider>
          }
        />
        <Route path="/productos/*" element={<ProductsRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
