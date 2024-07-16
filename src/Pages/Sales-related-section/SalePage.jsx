/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import styles from "./SalePage.module.css";
import { v4 as uuid } from "uuid";
import Header from "../../Components/Header/Header";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import {
  Input,
  Select,
  ButtenText,
} from "../../Components/Form-items/FormItems";
import { CheckIcon } from "../../Icons/Icons";
import findProductFarsiName from "../../Functions/findProductFarsiName";

function Main() {
  const productRegisteringDivisionTextRef = React.useRef(0);
  const productsSelectRef = React.useRef(0);
  const productNumberInputRef = React.useRef(0);
  const productPriceInputRef = React.useRef(0);
  const [dialogOfSuccesRegister, setDialogOfSuccesRegister] =
    React.useState(false);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function DialogOfSuccesRegisterComponnent() {
    return (
      <>
        <Dialog
          open={dialogOfSuccesRegister}
          TransitionComponent={Transition}
          keepMounted
          onClose={dialogOfSuccesRegisterHandleClose}
          aria-describedby="alert-dialog-slide-description"
          sx={{ direction: "ltr" }}
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              sx={{ direction: "rtl", textAlign: "center" }}
            >
              <CheckIcon />
              <div className={styles.productRegisteringAlertText}>
                {productRegisteringTextWrite()} با موفقیت ثبت شده و محصولات شما
                برای فروش قرار داده شد
              </div>
              <div className={styles.productRegisteringAlertMoment}></div>
            </DialogContentText>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </>
    );
  }

  const dialogOfSuccesRegisterHandleClickOpen = () => {
    setDialogOfSuccesRegister(true);
  };

  const dialogOfSuccesRegisterHandleClose = () => {
    setDialogOfSuccesRegister(false);
  };

  function productRegisteringTextWrite() {
    const productChoosedNumber = productNumberInputRef.current.value || 0;
    const productChoosedPrice = productPriceInputRef.current.value || 0;
    const productFarsiName = productsSelectRef.current
      ? findProductFarsiName(productsSelectRef.current.value)
      : "موز";

    return `فروش ${productChoosedNumber} 
      عدد ${productFarsiName}${" "}
      به قیمت هرعدد ${productChoosedPrice} تومان
      `;
  }

  React.useEffect(() => {
    productRegisteringDivisionTextRef.current.textContent =
      productRegisteringTextWrite();
  });

  function productNumberInputHandle() {
    const inputValue = productNumberInputRef.current.value;
    const isProductChooseNumberInputCorrect = /[1-9]/;

    if (isProductChooseNumberInputCorrect.test(inputValue) && inputValue > 0) {
      productNumberInputRef.current.classList.remove(
        styles.productsFormInputsError
      );
      productRegisteringDivisionTextRef.current.textContent =
        productRegisteringTextWrite();
    } else {
      productNumberInputRef.current.classList.add(
        styles.productsFormInputsError
      );
      productNumberInputRef.current.value = "";
    }
  }

  function productPriceInputHandle() {
    const inputValue = productPriceInputRef.current.value;
    const isProductChooseNumberInputCorrect = /[1-9]/;

    if (isProductChooseNumberInputCorrect.test(inputValue) && inputValue > 0) {
      productPriceInputRef.current.classList.remove(
        styles.productsFormInputsError
      );
      productRegisteringDivisionTextRef.current.textContent =
        productRegisteringTextWrite();
    } else {
      productPriceInputRef.current.classList.add(
        styles.productsFormInputsError
      );
      productPriceInputRef.current.value = "";
    }
  }
  function handleSelectChange() {
    productRegisteringDivisionTextRef.current.textContent =
      productRegisteringTextWrite();
  }

  function wait2SeconsAndGoToTheLastPage() {
    setTimeout(function () {
      location.assign("/");
    }, 2000);
  }

  const productsInformations =
    JSON.parse(localStorage.getItem("productsInformations")) || [];

  function changeLocalStorage() {
    let productWasAlreadyExist = false;
    productsInformations.forEach((item, index) => {
      if (item.name === productsSelectRef.current.value) {
        if (item.price === parseInt(productPriceInputRef.current.value)) {
          productWasAlreadyExist = true;
          const productNewNumber =
            productsInformations[index].number +
            parseInt(productNumberInputRef.current.value);

          productsInformations[index].number = productNewNumber;
          window.localStorage.setItem(
            "productsInformations",
            JSON.stringify(productsInformations)
          );
        }
      }
    });
    if (!productWasAlreadyExist) {
      const newProduct = {
        name: productsSelectRef.current.value,
        price: parseInt(productPriceInputRef.current.value),
        number: parseInt(productNumberInputRef.current.value),
        id: uuid(),
      };
      productsInformations.push(newProduct);

      window.localStorage.setItem(
        "productsInformations",
        JSON.stringify(productsInformations)
      );
    }
  }

  function productRegisteringSubmitHandle() {
    dialogOfSuccesRegisterHandleClickOpen();
    wait2SeconsAndGoToTheLastPage();
    changeLocalStorage();
  }

  function ProductsForm() {
    function handleSubmit(event) {
      event.preventDefault();
      productRegisteringSubmitHandle();
    }
    return (
      <>
        <form onSubmit={handleSubmit}>
          <li className={styles.productsFormItems}>
            محصول مورد نظر :{" "}
            <Select ref={productsSelectRef} onChange={handleSelectChange}>
              <option value="banana">موز</option>
              <option value="orange">پرتقال</option>
              <option value="apple">سیب</option>
            </Select>
          </li>
          <li className={styles.productsFormItems}>
            <label htmlFor="productNumberInput">تعداد محصول : </label>
            <Input
              placeholder="1,2,3,..."
              id="productNumberInput"
              ref={productNumberInputRef}
              onChange={productNumberInputHandle}
            />
          </li>
          <li className={styles.productsFormItems}>
            <label htmlFor="productChoosePriceInput">قیمت محصول : </label>
            <Input
              placeholder="1000"
              onChange={productPriceInputHandle}
              ref={productPriceInputRef}
              id="productPriceInputID"
            />
          </li>
          <li className={styles.productsFormItems}>
            <ProductRegisteringDivision />
          </li>
        </form>
      </>
    );
  }

  function ProductRegisteringDivision() {
    return (
      <>
        <div className={styles.productRegisteringDivision}>
          <div
            className={styles.productRegisteringDivisionText}
            ref={productRegisteringDivisionTextRef}
          ></div>
          <Button
            id="submitButton"
            type="submit"
            variant="contained"
            color="success"
            size="large"
            sx={{ minWidth: "20%", padding: "2%" }}
          >
            <ButtenText>تایید</ButtenText>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <main>
        <div className={styles.outerContainer}>
          <div className={styles.InnerContainer}>
            <ProductsForm />
          </div>
        </div>
        <DialogOfSuccesRegisterComponnent />
      </main>
    </>
  );
}

function App() {
  return (
    <>
      <Header pageTitle="بخش فروش" />
      <Main />
    </>
  );
}

export default App;
