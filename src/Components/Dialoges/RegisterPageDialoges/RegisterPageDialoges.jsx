/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import styles from "./RegisterPageDialoges.module.css";

export function DialogOfDemandMoreThanSupplyComponent({
  dialogOfDemandMoreThanSupply,
  dialogOfDemandMoreThanSupplyHandleClose,
}) {
  // هرگاه تعداد درخواستی برای محصول بیشتر از موجودی انبار باشد،این قسمت نمایش داده میشود
  return (
    <>
      <Dialog
        open={dialogOfDemandMoreThanSupply}
        onClose={dialogOfDemandMoreThanSupplyHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
        <DialogActions sx={{ direction: "ltr" }}>
          <Button onClick={dialogOfDemandMoreThanSupplyHandleClose}>
            بازگشت
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export function DialogOfSuccessRegisterComponent({
  dialogOfSuccesRegister,
  dialogOfSuccesRegisterHandleClose,
  children,
}) {
  // زمانی که خرید محصول با موفقیت انجام شد،این بخش نمایش داده میشود
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
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}
