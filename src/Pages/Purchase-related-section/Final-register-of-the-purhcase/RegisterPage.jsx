/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeProduct,
  decreaseProductNumber,
} from "../../../Redux/actions/productActions";
import styles from "./RegisterPage.module.css";
import { Header } from "../../../Components";
import { CheckIcon } from "../../../Icons/Icons";
import {
  DialogOfDemandMoreThanSupplyComponent,
  DialogOfSuccessRegisterComponent,
} from "../../../Components";
import { ProductsFormRegisterPage } from "../../../Components";
import findProductFarsiName from "../../../Functions/findProductFarsiName";

function Main() {
  const productNumberInputRef = React.useRef(0);
  const productRegisteringDivisionTextRef = React.useRef(0);
  const [dialogOfDemandMoreThanSupply, setDialogOfDemandMoreThanSupply] =
    React.useState(false);

  const [productNumber, setProductNumber] = React.useState(0);

  const dialogOFDemandMoreThanSupplyHandleClickOpen = () => {
    setDialogOfDemandMoreThanSupply(true);
  };

  const dialogOfDemandMoreThanSupplyHandleClose = () => {
    setDialogOfDemandMoreThanSupply(false);
  };

  const [dialogOfSuccesRegister, setDialogOfSuccesRegister] =
    React.useState(false);

  const dialogOfSuccesRegisterHandleClickOpen = () => {
    setDialogOfSuccesRegister(true);
  };

  const dialogOfSuccesRegisterHandleClose = () => {
    setDialogOfSuccesRegister(false);
  };

  const productsInformations = useSelector((state) => state.products.value);
  const dispatch = useDispatch();

  const productID = location.hash.substring(1);
  // برای فهمیدن محصول فعلی،از آدرس صفحه استفاده میکنیم که مطابق با آیدی هر محصول است

  const [product, setProduct] = React.useState(
    productsInformations.find(function (item, index) {
      return item.id === productID;
    })
  );
  const productFarsiName = findProductFarsiName(product.name);

  const shoppingCartInformations =
    JSON.parse(localStorage.getItem("shoppingCartInformations")) || [];

  function wait3SeconsAndGoToTheLastPage() {
    // زمانی که عملیات خرید با موفقیت ثبت شد،به صفحه خرید برگرد
    setTimeout(function () {
      location.assign("../Purchase-page");
    }, 3200);
  }

  function productRegisteringSubmitHandle() {
    const productNumberInputValue = productNumberInputRef.current.value;
    if (productNumberInputValue > product.number) {
      // یعنی تعداد درخواستی بیشتر از موجودی است
      dialogOFDemandMoreThanSupplyHandleClickOpen();
    } else {
      function showDialogOfSuccesRegister() {
        dialogOfSuccesRegisterHandleClickOpen();
        wait3SeconsAndGoToTheLastPage();
      }
      function changeShoppingCartLocalStorage() {
        let productWasAlreadyExist = false;
        shoppingCartInformations.forEach((item, index) => {
          if (item.id === productID) {
            productWasAlreadyExist = true;
            const productNewNumber =
              shoppingCartInformations[index].number +
              parseInt(productNumberInputValue);
            shoppingCartInformations[index].number = productNewNumber;
            window.localStorage.setItem(
              "shoppingCartInformations",
              JSON.stringify(shoppingCartInformations)
            );
          }
        });
        if (!productWasAlreadyExist) {
          const newShoppingProduct = {
            name: product.name,
            price: product.price,
            number: parseInt(productNumberInputValue),
            id: productID,
          };
          shoppingCartInformations.push(newShoppingProduct);

          window.localStorage.setItem(
            "shoppingCartInformations",
            JSON.stringify(shoppingCartInformations)
          );
        }
      }
      function changeProductInformations() {
        const productIndex = productsInformations.findIndex((item, index) => {
          return item.id === productID;
        });
        const productNewNumber =
          productsInformations[productIndex].number - productNumberInputValue;

        if (productNewNumber === 0) {
          dispatch(removeProduct(productID));
        } else {
          dispatch(decreaseProductNumber(productID, productNewNumber));
        }
      }
      changeProductInformations();
      showDialogOfSuccesRegister();
      changeShoppingCartLocalStorage();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    productRegisteringSubmitHandle();
  }
  return (
    <>
      <main className={styles.main}>
        <div className={styles.mainInnerContainer}>
          <ProductsFormRegisterPage
            handleSubmit={handleSubmit}
            product={product}
            productNumber={productNumber}
            setProductNumber={setProductNumber}
            productNumberInputRef={productNumberInputRef}
            productRegisteringDivisionTextRef={
              productRegisteringDivisionTextRef
            }
          />

          <DialogOfDemandMoreThanSupplyComponent
            dialogOfDemandMoreThanSupply={dialogOfDemandMoreThanSupply}
            dialogOfDemandMoreThanSupplyHandleClose={
              dialogOfDemandMoreThanSupplyHandleClose
            }
          />
          <DialogOfSuccessRegisterComponent
            dialogOfSuccesRegister={dialogOfSuccesRegister}
            dialogOfSuccesRegisterHandleClose={
              dialogOfSuccesRegisterHandleClose
            }
          >
            <CheckIcon />
            <div className={styles.productRegisteringAlertText}>{`
            ${productNumber} عدد ${productFarsiName} با قیمت ${
              productNumber * product.price
            } تومان به سبد خرید اضافه شد`}</div>
          </DialogOfSuccessRegisterComponent>
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <>
      <Header pageTitle="ثبت نهایی خرید" />
      <Main />
    </>
  );
}

export default App;
