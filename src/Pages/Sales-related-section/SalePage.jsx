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
    //زمانی که محصول برای فروش قرار داده میشود،این بخش نمایش داده میشود
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
    // اطلاعات مربوط به محصول در حال فروش را آپدیت میکند
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
    // مربوط به قسمت تعداد محصول
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
    // مربوط به قسمت قیمت محصول
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
    // مربوط به قسمت نوع محصول
    productRegisteringDivisionTextRef.current.textContent =
      productRegisteringTextWrite();
  }

  function wait2SeconsAndGoToTheLastPage() {
    // زمانی که فروش محصول تایید شد،به صفحه اصلی سایت برمیگردد
    setTimeout(function () {
      location.assign("/");
    }, 2000);
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
          const productNewNumber =
            productsInformations[index].number +
            parseInt(productNumberInputRef.current.value);

          dispatch(increaseProductNumber(item.id, productNewNumber));
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
      dispatch(addProduct(newProduct));
    }
  }

  function productRegisteringSubmitHandle() {
    dialogOfSuccesRegisterHandleClickOpen();
    wait2SeconsAndGoToTheLastPage();
    changeProductsInformations();
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
              id="productNumberInput"
              ref={productNumberInputRef}
              placeholder="1,2,3,..."
              required
              onChange={productNumberInputHandle}
            />
          </li>
          <li className={styles.productsFormItems}>
            <label htmlFor="productChoosePriceInput">قیمت محصول : </label>
            <Input
              id="productPriceInputID"
              ref={productPriceInputRef}
              placeholder="1000"
              required
              onChange={productPriceInputHandle}
            />
          </li>
          <li className={styles.productsFormItems}>
            <div className={styles.productRegisteringDivision}>
              {/* شامل قسمت ثبت اطلاعات محصول در حال فروش،و دکمه ی تایید */}
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
          </li>
        </form>
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
