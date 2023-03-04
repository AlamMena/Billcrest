import { AiOutlineLoading } from "react-icons/ai";
import React from "react";
import styles from "./loading.module.css";
import { LinearProgress } from "@mui/material";

export default function Loading() {
  return (
    <>
      <div className={styles.container}>
        {/* <div className={styles.img_container}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3bAlqaZSh0mViahdE_MNIduBQZBWwyBEZtA&usqp=CAU" />
        </div> */}
        <div>
          <LinearProgress className="w-64" />
        </div>
      </div>
    </>
  );
}
