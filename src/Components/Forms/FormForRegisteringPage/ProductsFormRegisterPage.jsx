/* eslint-disable no-unused-vars */
import * as React from "react";
import styles from "./ProductsForm.module.css";
import { Button } from "@mui/material";
import { RiErrorWarningLine } from "react-icons/ri";
import { ButtenText } from "../../";
import findProductFarsiName from "../../../Functions/findProductFarsiName";

function ProductsForm({
  handleSubmit,
  product,
  productNumberInputRef,
  productRegisteringDivisionTextRef,
  productNumber,
  setProductNumber,
}) {
  const [alertOfInvalidInputs, setAlertOfInvalidInputs] = React.useState(false);
  const [submitButtonOn, setSubmitButtonOn] = React.useState(false);
  const productFarsiName = findProductFarsiName(product.name);

  function productNumberInputHandle(event) {
    // مربوط به قسمت تعداد محصول
    if (event) {
      const inputValue = parseInt(event.target.value);
      setProductNumber(inputValue || 0);

      setAlertOfInvalidInputs(true);
      const isProductChooseNumberInputCorrect = /[1-9]/;
      if (
        isProductChooseNumberInputCorrect.test(inputValue) &&
        inputValue > 0
      ) {
        setAlertOfInvalidInputs(false);
        setSubmitButtonOn(true);
        event.target.classList.remove(styles.productNumberInputError);
      } else {
        setSubmitButtonOn(false);
        productRegisteringDivisionTextRef.current.innerHTML = "";
        event.target.value = "";
        event.target.classList.add(styles.productNumberInputError);
      }
    }
  }

  return (
    <>
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
            <label htmlFor="productNumberInput">تعداد محصول درخواستی :</label>{" "}
            <div className={styles.productNumberInputAndAlert}>
              <input
                id="productNumberInput"
                type="text"
                className={styles.productNumberInput}
                ref={productNumberInputRef}
                placeholder="1,2,3,..."
                required
                onChange={productNumberInputHandle}
              />
              {alertOfInvalidInputs && (
                // زمانی که اطلاعات وارده شامل چیزی غیر از اعداد طبیعی باشد،این قسمت نمایش داده میشود
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
            >
              {`خرید ${productNumber} عدد ${productFarsiName} به قیمت 
                ${productNumber * product.price} تومان`}
            </div>
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
    </>
  );
}

export default ProductsForm;
