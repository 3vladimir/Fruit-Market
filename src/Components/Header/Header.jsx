/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import {ShoppingCart} from "../";

function Header({ pageTitle }) {
  const [shoppingCartOpen, setShoppingCartOpen] = React.useState(false);

  function toggleTheSoppingCart() {
    setShoppingCartOpen(!shoppingCartOpen);
    // یعنی اگر سبد خرید باز بود،آن را ببند و اگر بسته بود،باز کن
  }

  return (
    <>
      <div className={styles.headerOuterContainer}>
        <div className={styles.headerInnerContainer}>
          <div className={styles.headerNav}>
            <nav>
              <div className={styles.headerNavItemsContainer}>
                <li className={styles.headerNavItems}>
                  <Link to={"/"}>
                    <Button
                      id="homeButton"
                      sx={{ color: "black", minWidth: "1em" }}
                    >
                      <span className={styles.headerButtonText}>خانه</span>
                      <FaHome className={styles.headerButtonIcons} />
                    </Button>
                  </Link>
                </li>
                <li className={styles.headerNavItems}>
                  <Button
                    id="shoppingCartButton"
                    onClick={toggleTheSoppingCart}
                    sx={{ color: "black", minWidth: "1em" }}
                  >
                    <span className={styles.headerButtonText}>سبد خرید</span>
                    <FaShoppingCart className={styles.headerButtonIcons} />
                  </Button>
                  <ShoppingCart shoppingCartOpen={shoppingCartOpen} />
                </li>
              </div>
            </nav>
          </div>
          <h1 className={styles.headerTitle}>{pageTitle}</h1>
        </div>
      </div>
    </>
  );
}

function App({ pageTitle }) {
  return (
    <>
      <Header pageTitle={pageTitle} />
    </>
  );
}

export default App;
