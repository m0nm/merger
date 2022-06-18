import Image from "next/image";
import React from "react";
import styles from "../styles/Main.module.scss";
import pdfIcon from "../public/pdf-icon.svg";

function FileCard({ fileName }: { fileName: string }) {
  return (
    <div className={styles.file}>
      <div className={styles.icon}>
        <Image src={pdfIcon} alt="" layout="fill" />
      </div>
      <p>{fileName}</p>
    </div>
  );
}

export default FileCard;
