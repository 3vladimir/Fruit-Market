import * as React from "react";
import { FaCheck } from "react-icons/fa";
import styles from './Icons.module.css'

export function CheckIcon() {
    return (
        <>
        <FaCheck className={styles.checkIcon}/>
        </>
    )
}