/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { CheckIcon } from "../../../Icons/Icons";
import styles from "./SalePageDialoges.module.css";

export function DialogOfSuccesRegisterComponnent({
  productNumber,
  productFarsiName,
  productPrice,
  dialogOfSuccesRegister,
  dialogOfSuccesRegisterHandleClose,
}) {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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
              {`${productNumber} عدد ${productFarsiName} به قیمت هر عدد ${productPrice}
             تومان برای فروش قرار داده شد`}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}
