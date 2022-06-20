import Image from "next/image";
import React, { LegacyRef } from "react";
import styles from "../styles/Main.module.scss";
import pdfIcon from "../public/pdf-icon.svg";
import removeIcon from "../public/close.svg";

type IFileCard = {
  index: number;
  removeFile: (index: number) => void;
  fileName: string;
};

const FileCard = React.forwardRef((props: IFileCard, ref) => (
  <div
    ref={ref as LegacyRef<HTMLDivElement> | undefined}
    className={styles.file}
  >
    {/* close */}
    <div
      onClick={() => props.removeFile(props.index)}
      className={styles.remove}
    >
      <Image src={removeIcon} alt="remove pdf" width={24} height={24} />
    </div>

    {/* image */}
    <div className={styles.icon}>
      <Image src={pdfIcon} alt="" layout="fill" />
    </div>

    {/* name */}
    <p>{props.fileName}</p>
  </div>
));

FileCard.displayName = "FileCard";

export default FileCard;
