import * as React from "react";
import styles from "./FormItems.module.css";

export const Input = React.forwardRef((props, ref) => {
  return <input required className={styles.input} ref={ref} {...props} />;
});

export const Select = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <select className={styles.select} ref={ref} {...props}>
      {children}
    </select>   
  );
});

export function ButtenText({ children, ...props }) {
  return (
    <>
      <span className={styles.buttonText} {...props}>
        {children}
      </span>
    </>
  );
}
