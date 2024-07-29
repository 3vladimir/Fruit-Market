/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  increaseProductNumber,
} from "../../Redux/actions/productActions";
import styles from "./SalePage.module.css";
import { v4 as uuid } from "uuid";
import { Header } from "../../Components";
import { CheckIcon } from "../../Icons/Icons";
import { DialogOfSuccesRegisterComponnent } from "../../Components";
import { ProductsFormSalePage } from "../../Components";
import { Title } from "../../Components";

function Main() {
  const productRegisteringDivisionTextRef = React.useRef(0);
  const productsSelectRef = React.useRef(0);
  const productNumberInputRef = React.useRef(0);
  const productPriceInputRef = React.useRef(0);
  const [dialogOfSuccesRegister, setDialogOfSuccesRegister] =
    React.useState(false);

  function dialogOfSuccesRegisterHandleClickOpen() {
    setDialogOfSuccesRegister(true);
  }

  function dialogOfSuccesRegisterHandleClose() {
    setDialogOfSuccesRegister(false);
  }

  const [productNumber, setProductNumber] = React.useState(0);
  const [productPrice, setProductPrice] = React.useState(0);
  const [productFarsiName, setProductFarsiName] = React.useState("موز");

  React.useEffect(() => {
    productRegisteringDivisionTextRef.current.textContent = `فروش ${productNumber} عدد ${productFarsiName} به قیمت هر عدد ${productPrice} تومان`;
  }, [productNumber, productPrice, productFarsiName]);

  function wait2SeconsAndGoToTheLastPage() {
    // زمانی که فروش محصول تایید شد،به صفحه اصلی سایت برمیگردد
    setTimeout(function () {
      location.assign("/");
    }, 2200);
  }

  const productsInformations = useSelector((state) => state.products.value);
  const dispatch = useDispatch();

  function changeProductsInformations() {
    // محصولی که برای فروش قرار داده شده را به لیست محصولات اضافه کن
    let productWasAlreadyExist = false;
    productsInformations.forEach((item, index) => {
      if (item.name === productsSelectRef.current.value) {
        if (item.price === parseInt(productPriceInputRef.current.value)) {
          productWasAlreadyExist = true;
          // یعنی محصول در با قیمت مشابه در لیست وجود دارد
          // در نتیجه فقط موجودی آن را افزایش بده
          const productNewNumber =
            productsInformations[index].number +
            parseInt(productNumberInputRef.current.value);

          dispatch(increaseProductNumber(item.id, productNewNumber));
        }
      }
    });
    if (!productWasAlreadyExist) {
      // یعنی محصول با قیمت مشابه در لیست موجود نیست و باید آیتم جدیدی بسازد
      const newProduct = {
        name: productsSelectRef.current.value,
        price: parseInt(productPriceInputRef.current.value),
        number: parseInt(productNumberInputRef.current.value),
        id: uuid(),
      };
      dispatch(addProduct(newProduct));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    dialogOfSuccesRegisterHandleClickOpen();
    wait2SeconsAndGoToTheLastPage();
    changeProductsInformations();
  }

  return (
    <>
      <main>
        <div className={styles.outerContainer}>
          <div className={styles.InnerContainer}>
            <ProductsFormSalePage
              setProductNumber={setProductNumber}
              setProductPrice={setProductPrice}
              setProductFarsiName={setProductFarsiName}
              handleSubmit={handleSubmit}
              productsSelectRef={productsSelectRef}
              productNumberInputRef={productNumberInputRef}
              productPriceInputRef={productPriceInputRef}
              productRegisteringDivisionTextRef={
                productRegisteringDivisionTextRef
              }
            />
          </div>
        </div>
        <DialogOfSuccesRegisterComponnent
          dialogOfSuccesRegister={dialogOfSuccesRegister}
          dialogOfSuccesRegisterHandleClose={dialogOfSuccesRegisterHandleClose}
        >
          <CheckIcon />
          <div className={styles.productRegisteringAlertText}>
            {`${productNumber} عدد ${productFarsiName} به قیمت هر عدد ${productPrice}
             تومان برای فروش قرار داده شد`}
          </div>
          <div className={styles.productRegisteringAlertMoment}></div>
        </DialogOfSuccesRegisterComponnent>
      </main>
    </>
  );
}

function App() {
  return (
    <>
      <Title>بخش فروش</Title>
      <Header pageTitle="بخش فروش" />
      <Main />
    </>
  );
}

export default App;
