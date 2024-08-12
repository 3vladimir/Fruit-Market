/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import {
  homePageAddress,
  slaePageAddress,
  purchasePageAddress,
  registerPageAddress,
} from "./Routes/Routes";
import { HomePage, SalePage, PurchasePage, RegisterPage } from "./Pages";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path={homePageAddress} element={<HomePage />} />
          <Route path={slaePageAddress} element={<SalePage />} />
          <Route path={purchasePageAddress} element={<PurchasePage />} />
          <Route
            path={`${purchasePageAddress}/${registerPageAddress}`}
            element={<RegisterPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
