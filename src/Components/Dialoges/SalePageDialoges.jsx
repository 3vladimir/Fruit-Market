/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { CheckIcon } from "../../Icons/Icons";

export function DialogOfSuccesRegisterComponnent({
  dialogOfSuccesRegister,
  dialogOfSuccesRegisterHandleClose,
  children,
}) {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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
            {/* <CheckIcon /> */}
            {children}
            {/* <div className={styles.productRegisteringAlertText}>
                {productRegisteringTextWrite()} با موفقیت ثبت شده و محصولات شما
                برای فروش قرار داده شد
              </div>
              <div className={styles.productRegisteringAlertMoment}></div> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}
