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
import Header from "../../../Components/Header/Header";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { RiErrorWarningLine } from "react-icons/ri";
import { CheckIcon } from "../../../Icons/Icons";
import { ButtenText } from "../../../Components/Form-items/FormItems";
import findProductFarsiName from "../../../Functions/findProductFarsiName";

function Main() {
  function DialogOfDemandMoreThanSupplyComponent() {
    return (
      <>
        <Dialog
          open={dialogOfDemandMoreThanSupply}
          onClose={dialogOfDemandMoreThanSupplyHandleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ direction: "ltr" }}
        >
          <DialogTitle id="alert-dialog-title">
            <span className={styles.dialogOfDemandMoreThanSupplyText}>
              {"خطا"}
            </span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <span className={styles.dialogOfDemandMoreThanSupplyText}>
                تعداد درخواستی محصول بیشتر از موجودی میباشد
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={dialogOfDemandMoreThanSupplyHandleClose}>
              <ButtenText>بازگشت</ButtenText>
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  function DialogOfSuccessRegisterComponent() {
    const [moment, setMoment] = React.useState(3);

    function startTime() {
      setTimeout(() => {
        setMoment(moment - 1);
      }, 1000);
    }

    React.useEffect(() => {
      startTime();
    }, [moment]);

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
                {productRegisteringTextWrite()} با موفقیت انجام شده و به سبد
                خرید اضافه شد
              </div>
              <div className={styles.productRegisteringAlertMoment}>
                {moment}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </>
    );
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [dialogOfSuccesRegister, setDialogOfSuccesRegister] =
    React.useState(false);

  const dialogOfSuccesRegisterHandleClickOpen = () => {
    setDialogOfSuccesRegister(true);
  };

  const dialogOfSuccesRegisterHandleClose = () => {
    setDialogOfSuccesRegister(false);
  };

  const [dialogOfDemandMoreThanSupply, setDialogOfDemandMoreThanSupply] =
    React.useState(false);

  const dialogOFDemandMoreThanSupplyHandleClickOpen = () => {
    setDialogOfDemandMoreThanSupply(true);
  };

  const dialogOfDemandMoreThanSupplyHandleClose = () => {
    setDialogOfDemandMoreThanSupply(false);
  };

  const productID = location.hash.substring(1);

  const productsInformations = useSelector((state) => state.products.value);
  React.useEffect(() => {
    localStorage.setItem(
      "productsInformations",
      JSON.stringify(productsInformations)
    );
  }, [productsInformations]);

  const dispatch = useDispatch();

  const [product, setProduct] = React.useState(
    productsInformations.find(function (item, index) {
      return item.id === productID;
    })
  );

  let shoppingCartInformations = [];
  const probablyShoppingCartInformations = window.localStorage.getItem(
    "shoppingCartInformations"
  );
  if (probablyShoppingCartInformations) {
    shoppingCartInformations = JSON.parse(probablyShoppingCartInformations);
  }

  const productFarsiName = findProductFarsiName(product.name);
  const productNumberInputRef = React.useRef(0);
  const productRegisteringDivisionTextRef = React.useRef(0);

  const [alertOfInvalidInputs, setAlertOfInvalidInputs] = React.useState(false);

  const [submitButtonOn, setSubmitButtonOn] = React.useState(false);

  function productRegisteringTextWrite() {
    return `خرید ${productNumberInputRef.current.value} 
    عدد ${productFarsiName} به قیمت ${
      productNumberInputRef.current.value * product.price
    } تومان`;
  }

  function productNumberInputHandle() {
    setAlertOfInvalidInputs(true);
    const inputValue = productNumberInputRef.current.value;
    const isProductChooseNumberInputCorrect = /[1-9]/;
    if (isProductChooseNumberInputCorrect.test(inputValue) && inputValue > 0) {
      setAlertOfInvalidInputs(false);
      setSubmitButtonOn(true);
      productNumberInputRef.current.classList.remove(
        styles.productNumberInputError
      );
      productRegisteringDivisionTextRef.current.textContent =
        productRegisteringTextWrite();
    } else {
      setSubmitButtonOn(false);
      productRegisteringDivisionTextRef.current.innerHTML = "";
      productNumberInputRef.current.value = "";
      productNumberInputRef.current.classList.add(
        styles.productNumberInputError
      );
    }
  }

  function wait3SeconsAndGoToTheLastPage() {
    setTimeout(function () {
      location.assign("../Purchase-page");
    }, 3200);
  }

  function productRegisteringSubmitButtonHandle() {
    const productNumberInputValue = productNumberInputRef.current.value;
    if (productNumberInputValue > product.number) {
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
    productRegisteringSubmitButtonHandle();
  }
  return (
    <>
      <main className={styles.main}>
        <div className={styles.mainInnerContainer}>
          <p></p>
          <p></p>
          <form onSubmit={handleSubmit}>
            <ul>
              <li className={styles.formListItems}>
                نوع محصول : {productFarsiName}
              </li>
              <li className={styles.formListItems}>
                موجودی : {product.number} عدد
              </li>
              <li
                className={`${styles.formListItems} ${styles.productNumberLabeAndInput}`}
              >
                <label htmlFor="productNumberInput">
                  تعداد محصول درخواستی :
                </label>{" "}
                <div className={styles.productNumberInputAndAlert}>
                  <input
                    id="productNumberInput"
                    type="text"
                    className={styles.productNumberInput}
                    ref={productNumberInputRef}
                    placeholder="1,2,3,..."
                    onInput={productNumberInputHandle}
                  />
                  {alertOfInvalidInputs && (
                    <div className={styles.alertOfInvalidInputs}>
                      امکان پذیر نمی باشد
                      <RiErrorWarningLine
                        className={styles.alertOfInvalidInputsIcon}
                      />
                    </div>
                  )}
                </div>
              </li>

              <li
                className={`${styles.formListItems} ${styles.productRegisteringDivision}`}
              >
                <div
                  className={styles.productRegisteringDivisionText}
                  ref={productRegisteringDivisionTextRef}
                ></div>
                {submitButtonOn && (
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
                )}
              </li>
            </ul>
          </form>
          <DialogOfDemandMoreThanSupplyComponent />
          <DialogOfSuccessRegisterComponent />
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
