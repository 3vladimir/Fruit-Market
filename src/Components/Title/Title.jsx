import * as React from "react";
import { Helmet } from "react-helmet"

function App({children}) {
    return(
        <>
        <Helmet>
            <title>
                {children}
                {' '}
                |
                خرید و فروش میوه
            </title>
        </Helmet>
        </>
    )
}

export default App