/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import Slide from "@mui/material/Slide";
import { Title } from "../../Components";

function Header() {
  const [titleChecked, setTitleChecked] = React.useState(false);
  React.useEffect(() => {
    setTitleChecked(true);
  }, []);

  const headerRef = React.useRef();
  return (
    <>
      <div className={styles.headerOuterContainer} ref={headerRef}>
        <div className={styles.headerInnerContainer}>
          <header>
            <Slide direction="down" in={titleChecked} timeout={1500}>
              <h1 className={styles.firstTitle}>خرید و فروش میوه</h1>
            </Slide>
            <Slide
              direction="up"
              in={titleChecked}
              container={headerRef.current}
              timeout={1500}
            >
              <h2 className={styles.secondTtile}>
                در این وبسایت میتوانید موز،پرتقال و سیب را با قیمت های موجود
                خریداری کنید و یا با قیمت های مد نظرتان،آن ها را برای فروش قرار
                دهید
              </h2>
            </Slide>
          </header>
        </div>
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      <main>
        <div className={styles.mainOuterContainer}>
          <div className={styles.mainInnerContainer}>
            <Link to={"sale-page"}>
              <div className={`${styles.boxes} ${styles.purchaseBox}`}>
                بخش فروش
              </div>
            </Link>

            <Link to={"purchase-page"}>
              <div className={`${styles.boxes} ${styles.saleBox}`}>
                بخش خرید
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <>
      <Title>صفحه اصلی</Title>
      <Header />
      <Main />
    </>
  );
}

export default App;
