import * as React from "react";
import { Button } from "@mui/material";
import { Input, Select, ButtenText } from "../../";
import styles from "./ProductsForm.module.css";
import findProductFarsiName from "../../../Functions/findProductFarsiName.js";

function ProductsForm({
  setProductNumber,
  setProductPrice,
  setProductFarsiName,
  handleSubmit,
  productRegisteringDivisionTextRef,
  productsSelectRef,
  productNumberInputRef,
  productPriceInputRef,
}) {
  function productNumberInputHandle(event) {
    // مربوط به قسمت تعداد محصول
    if (event) {
      const inputValue = event.target.value;
      const isProductChooseNumberInputCorrect = /[1-9]/;

      if (
        isProductChooseNumberInputCorrect.test(inputValue) &&
        inputValue > 0
      ) {
        setProductNumber(parseInt(inputValue));
        event.target.classList.remove(styles.productsFormInputsError);
      } else {
        event.target.classList.add(styles.productsFormInputsError);
        event.target.value = "";
      }
    }
  }

  function productPriceInputHandle(event) {
    // مربوط به قسمت قیمت محصول
    if (event) {
      const inputValue = event.target.value;
      const isProductChooseNumberInputCorrect = /[1-9]/;

      if (
        isProductChooseNumberInputCorrect.test(inputValue) &&
        inputValue > 0
      ) {
        setProductPrice(parseInt(event.target.value));
        event.target.classList.remove(styles.productsFormInputsError);
      } else {
        event.target.classList.add(styles.productsFormInputsError);
        event.target.value = "";
      }
    }
  }

  function productNameSelectHandle(event) {
    // مربوط به قسمت نوع محصول
    if (event) {
      setProductFarsiName(findProductFarsiName(event.target.value));
    }
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   productRegisteringSubmitHandle();
  // }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <li className={styles.productsFormItems}>
          محصول مورد نظر :{" "}
          <Select ref={productsSelectRef} onChange={productNameSelectHandle}>
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

export default ProductsForm;
