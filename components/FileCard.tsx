import Image from "next/image";
import React, { LegacyRef } from "react";
import styles from "../styles/Main.module.scss";
import pdfIcon from "../public/pdf-icon.svg";

const FileCard = React.forwardRef((props: { fileName: string }, ref) => (
  <div
    ref={ref as LegacyRef<HTMLDivElement> | undefined}
    className={styles.file}
  >
    <div className={styles.icon}>
      <Image src={pdfIcon} alt="" layout="fill" />
    </div>

    <p>{props.fileName}</p>
  </div>
));

FileCard.displayName = "FileCard";

export default FileCard;
