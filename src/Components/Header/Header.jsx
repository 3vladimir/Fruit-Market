/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  increaseProductNumber,
} from "../../Redux/actions/productActions";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import findProductFarsiName from "../../Functions/findProductFarsiName";

function Header({ pageTitle }) {
  const [shoppingCartOpen, setShoppingCartOpen] = React.useState(false);

  function toggleTheSoppingCart() {
    setShoppingCartOpen(!shoppingCartOpen);
  }

  function ShoppingCart() {
    const productsInformations = useSelector((state) => state.products.value);
    React.useEffect(() => {
      localStorage.setItem(
        "productsInformations",
        JSON.stringify(productsInformations)
      );
    }, [productsInformations]);
    const dispatch = useDispatch();

    const [shoppingCartIsEmpty, setShoppingCartEmpty] = React.useState(false);
    const [shoppingCartInformations, setShoppingCartInformations] =
      React.useState(
        JSON.parse(localStorage.getItem("shoppingCartInformations")) || []
      );

    React.useEffect(() => {
      if (shoppingCartInformations.length === 0) {
        setShoppingCartEmpty(true);
      } else {
        setShoppingCartEmpty(false);
      }
    }, [shoppingCartInformations]);

    return (
      <>
        {shoppingCartOpen && (
          //شرط باز شدن سبد خرید
          <div className={styles.shoppingCartListInnerContainer}>
            <ul className={styles.shoppingCacrtList}>
              {shoppingCartIsEmpty && (
                //اگر سبد خرید خالی بود یک متن بنویس
                <p className={styles.shoppingCartIsEmptyText}>
                  سبد خرید خالی میباشد
                </p>
              )}
              {shoppingCartInformations.map(
                //موارد موجود در لیست سبد خرید را یکی یکی بنویس
                (shoppingcartInfItem, shoppingCartInfIndex) => (
                  <li key={shoppingcartInfItem.id}>
                    <div className={styles.shopiingCartItems}>
                      {/* شامل دو فرزند.یکی جمله آیتم سبد خرید یکی دکمه ی حذف */}
                      <div>
                        {shoppingcartInfItem.number}{" "}
                        {findProductFarsiName(shoppingcartInfItem.name)} به مبلغ{" "}
                        {shoppingcartInfItem.price * shoppingcartInfItem.number}{" "}
                        تومان
                      </div>
                      <Button
                        id="removeButton"
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ minWidth: "20%", padding: "2%" }}
                        onClick={() => {
                          //دکمه ی حذف
                          let productWasAlreadyExist = false;
                          productsInformations.forEach(
                            //در صورت حذف محصول اگر از قبل چنین محصولی داشتیم
                            //آن را پیدا کن و تعدادش را آپدیت کن
                            (productInfItem, productInfIndex) => {
                              if (
                                productInfItem.id === shoppingcartInfItem.id
                              ) {
                                productWasAlreadyExist = true;
                                //در مرحله ی بعد از این متغیر استفاده میشود

                                const productNewNumber =
                                  productsInformations[productInfIndex].number +
                                  parseInt(shoppingcartInfItem.number);
                                dispatch(
                                  increaseProductNumber(
                                    productInfItem.id,
                                    productNewNumber
                                  )
                                );
                              }
                            }
                          );
                          if (!productWasAlreadyExist) {
                            //اگر محصول در لیست نبود،آیتم جدیدی بساز
                            const newProduct = {
                              name: shoppingcartInfItem.name,
                              price: shoppingcartInfItem.price,
                              number: parseInt(shoppingcartInfItem.number),
                              id: shoppingcartInfItem.id,
                            };
                            dispatch(addProduct(newProduct));
                          }

                          const newShoppingCartInformations = [
                            // از یک آرایه کمکی استفاده میکنیم
                            ...shoppingCartInformations,
                          ];
                          newShoppingCartInformations.splice(
                            //آیتم را از لیست سبد خرید حذف کن
                            shoppingCartInfIndex,
                            1
                          );
                          setShoppingCartInformations(
                            newShoppingCartInformations
                          );
                          localStorage.setItem(
                            "shoppingCartInformations",
                            JSON.stringify(newShoppingCartInformations)
                          );
                        }}
                      >
                        <span className={styles.shopiingCartItemsButtonText}>
                          حذف
                        </span>
                      </Button>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </>
    );
  }
  //end of ShoppingCart

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
                  <ShoppingCart />
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
