/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/Home-page/HomePage";
import SalePage from "./pages/Sales-related-section/SalePage";
import PurchasePage from "./pages/Purchase-related-section/PurchasePage";
import RegisterPage from "./pages/Purchase-related-section/Final-register-of-the-purhcase/RegisterPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage></HomePage>}></Route>
          <Route path="sale-page" element={<SalePage></SalePage>}></Route>
          <Route
            path="purchase-page"
            element={<PurchasePage></PurchasePage>}
          ></Route>
          <Route
            path="Purchase-page/Register-page"
            element={<RegisterPage></RegisterPage>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
