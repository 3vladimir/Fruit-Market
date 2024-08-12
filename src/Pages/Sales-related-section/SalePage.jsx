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
import {
  Header,
  DialogOfSuccesRegisterComponnent,
  ProductsFormSalePage,
  Title,
} from "../../Components";

function Main() {
  const productRegisteringDivisionTextRef = React.useRef(0);
  // این مربوط به قسمتی است که اطلاعات نهایی محصول در حال فروش را به کاربر اطلاع دهد
  // اطلاعاتی که هنوز تایید نشده اند
  const productTypeRef = React.useRef(0);
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

  function wait2SeconsAndGoToTheHomePage() {
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
      if (item.name === productTypeRef.current.value) {
        if (item.price === parseInt(productPriceInputRef.current.value)) {
          productWasAlreadyExist = true;
          // یعنی محصول با قیمت مشابه در لیست وجود دارد
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
        name: productTypeRef.current.value,
        price: parseInt(productPriceInputRef.current.value),
        number: parseInt(productNumberInputRef.current.value),
        id: uuid(),
      };
      dispatch(addProduct(newProduct));
    }
  }

  function handleSubmit(event) {
    // مربوط به تایید اطلاعات فرم.زمانی که انجام شد،سه عملیات زیر اجرا میشوند
    event.preventDefault();
    dialogOfSuccesRegisterHandleClickOpen();
    // پنجره ای جهت تایید کردن عملیات باز میشود
    changeProductsInformations();
    // محصول وارد لیست میشود
    wait2SeconsAndGoToTheHomePage();
    // پس از 2 ثانیه به صفحه ی اصلی برمیگردد
  }

  return (
    <>
      <main>
        <div className={styles.outerContainer}>
          <div className={styles.InnerContainer}>
            <ProductsFormSalePage
              // کل ورودی های فرم و دکمه تایید
              setProductNumber={setProductNumber}
              setProductPrice={setProductPrice}
              setProductFarsiName={setProductFarsiName}
              handleSubmit={handleSubmit}
              productTypeRef={productTypeRef}
              productNumberInputRef={productNumberInputRef}
              productPriceInputRef={productPriceInputRef}
              productRegisteringDivisionTextRef={
                productRegisteringDivisionTextRef
              }
            />
          </div>
        </div>
        <DialogOfSuccesRegisterComponnent
          // زمانی که عملیات به پایان رسید و کالا برای فروش گذاشته شد،این قسمت نمایش داده میشود
          productNumber={productNumber}
          productFarsiName={productFarsiName}
          productPrice={productPrice}
          dialogOfSuccesRegister={dialogOfSuccesRegister}
          dialogOfSuccesRegisterHandleClose={dialogOfSuccesRegisterHandleClose}
        ></DialogOfSuccesRegisterComponnent>
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
