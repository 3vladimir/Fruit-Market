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
import { CheckIcon } from "../../../Icons/Icons";
import findProductFarsiName from "../../../lib/findProductFarsiName";
import {
  Header,
  DialogOfDemandMoreThanSupplyComponent,
  DialogOfSuccessRegisterComponent,
  ProductsFormRegisterPage,
  Title,
} from "../../../Components";

function Main() {
  const productNumberInputRef = React.useRef(0);
  const productRegisteringDivisionTextRef = React.useRef(0);
  const [dialogOfDemandMoreThanSupply, setDialogOfDemandMoreThanSupply] =
    React.useState(false);
  // مربوط به زمانی که تعداد محصول درخواستی کاربر بیشتر از موجودی باشد

  const [productNumber, setProductNumber] = React.useState(0);

  const dialogOFDemandMoreThanSupplyHandleClickOpen = () => {
    setDialogOfDemandMoreThanSupply(true);
  };

  const dialogOfDemandMoreThanSupplyHandleClose = () => {
    setDialogOfDemandMoreThanSupply(false);
  };

  const [dialogOfSuccesRegister, setDialogOfSuccesRegister] =
    React.useState(false);
  // مربوط به باز شدن پنجره ی تایید عملیات

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
      // تعداد درخواستی کاربر در انبار موجود است.پس عملیات خرید را انجام داده
      // و لیست محصولات نیز سبد خرید را آپدیت میکنیم
      function changeShoppingCartInformations() {
        let productWasAlreadyExist = false;
        shoppingCartInformations.forEach((item, index) => {
          if (item.id === productID) {
            // یعنی محصول از قبل در سبد خرید موجود است.پس صرفا باید مقدارش را افزایش دهیم
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
          // این یعنی محصول در سبد خرید نبوده و در نتیجه باید آیتم جدیدی در سبد خرید بسازیم
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
          // یعنی تمامی موجودی آن محصول خریداری شده و در نتیجه باید از لیست حذف شود
          dispatch(removeProduct(productID));
        } else {
          // یعنی موجودی محصول تمام نشده و صرفا باید مقدار جدیدی به آن بدهیم
          dispatch(decreaseProductNumber(productID, productNewNumber));
        }
      }
      changeProductInformations();
      dialogOfSuccesRegisterHandleClickOpen();
      wait3SeconsAndGoToTheLastPage();
      changeShoppingCartInformations();
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
            // زمانی که تعداد محصول درخواستی کاربر یبشتر از موجودی باشد
            // این پنجره به نمایش در میاید
            dialogOfDemandMoreThanSupply={dialogOfDemandMoreThanSupply}
            dialogOfDemandMoreThanSupplyHandleClose={
              dialogOfDemandMoreThanSupplyHandleClose
            }
          />
          <DialogOfSuccessRegisterComponent
            // پس از اتمام عملیات خرید،این پنجره جهت تایید به نمایش در میاید
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
      <Title>ثبت نهایی خرید</Title>
      <Header pageTitle="ثبت نهایی خرید" />
      <Main />
    </>
  );
}

export default App;
