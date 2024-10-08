/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { useSelector } from "react-redux";
import styles from "./PurchasePage.module.css";
import { Link } from "react-router-dom";
import { Button, useMediaQuery } from "@mui/material";
import { Header, Title, ButtenText } from "../../Components";
import findProductFarsiName from "../../lib/findProductFarsiName";
import {registerPageAddress} from '../../Routes/Routes'

function Main() {
  const productsInformations = useSelector((state) => state.products.value);

  const [productName, setProductName] = React.useState(
    window.localStorage.getItem("productName") || "banana"
  );
  const [productErrorOFRunOut, setProductErrorOFRunOut] = React.useState(false);
  // زمانی که از یک محصول هیچ موجودی در انبار نباشد
  const productTypeSelectRef = React.useRef(0);

  const screenWidthIsLessThan600px = useMediaQuery("(max-width: 600px)");

  React.useEffect(() => {
    productTypeSelectRef.current.value = productName;
    window.localStorage.setItem("productName", productName);
  }, [productName]);

  function handleSelectValue(event) {
    setProductName(event.target.value);
  }

  function ProductsItemOutput() {
    setProductErrorOFRunOut(true);

    return (
      <>
        {productErrorOFRunOut && (
          <li className={styles.prodcutNoExistText}>
            محصول مورد نظر شما موجود نمی باشد
          </li>
        )}
        <ul className={styles.productsItemsList}>
          {productsInformations.map((item) => {
            if (item.name === productName) {
              // مطابق با محصول تعیین شده،آیتم ها را یکی یکی بنویس
              setProductErrorOFRunOut(false);

              return (
                <li key={item.id} id={item.id} className={styles.productsItems}>
                  <div>
                    {`تعداد ${item.number} ${findProductFarsiName(
                      item.name
                    )} با قیمت هر عدد ${item.price} تومان موجود است`}
                  </div>
                  <Link to={`${registerPageAddress}#${item.id}`}>
                    <Button
                      id="button"
                      variant="contained"
                      size="small"
                      sx={screenWidthIsLessThan600px ? { minWidth: "1em" } : {}}
                    >
                      <ButtenText>خرید</ButtenText>
                    </Button>
                  </Link>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </>
    );
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.InnerContainer}>
          <select
            ref={productTypeSelectRef}
            onChange={handleSelectValue}
            className={styles.select}
          >
            <option value="banana">موز</option>
            <option value="orange">پرتقال</option>
            <option value="apple">سیب</option>
          </select>
          <ul className={styles.productsItemsList}>
            <ProductsItemOutput />
          </ul>
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <>
      <Title>بخش خرید</Title>
      <Header pageTitle="بخش خرید" />
      <Main />
    </>
  );
}

export default App;
