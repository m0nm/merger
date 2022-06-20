import Image from "next/image";
import React from "react";

import closeIcon from "../public/close.svg";
import spinner from "../public/spnner.gif";

import styles from "../styles/Modal.module.scss";

type IModal = {
  url?: string;
  closeModal: () => void;
};

function Modal({ url = "", closeModal }: IModal) {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        {!url ? (
          <div className={styles.loading}>
            <Image src={spinner} alt="" width={240} height={240} />
            <p>Please wait while we process the files...</p>
          </div>
        ) : (
          <div>
            <div onClick={closeModal} className={styles.closeIcon}>
              <Image src={closeIcon} alt="close" layout="fill" />
            </div>

            <h1>Your PDF File Is Ready!</h1>
            <a href={url as string} download="merged.pdf">
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
