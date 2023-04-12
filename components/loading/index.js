import { AiOutlineLoading } from "react-icons/ai";
import React from "react";
import styles from "./loading.module.css";
import { LinearProgress } from "@mui/material";
import Image from "next/image";

export default function Loading() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img_container}>
          <Image alt="" src="/logo.png" className={styles.icon} />
        </div>
        <div>
          <LinearProgress className="w-64" />
        </div>
      </div>
    </>
  );
}
