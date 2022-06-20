import React, { useState } from "react";

import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";

import axios from "axios";

import FileCard from "./FileCard";
import Modal from "./Modal";

import styles from "../styles/Main.module.scss";

function Main() {
  const [files, setFiles] = useState<File[]>([]);
  const [downloadUrl, setDownUrl] = useState("");
  const [modal, setModal] = useState(false);

  // display uploaded files
  const handleChange = (e: React.FormEvent) => {
    const { files: pdfFiles } = e.target as HTMLInputElement;

    pdfFiles?.length && setFiles((prev) => [...prev, pdfFiles[0]]);
  };

  // hadnle files order sorting
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setFiles((array) => arrayMove(array, oldIndex, newIndex));
  };

  // post request to merge
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    files.forEach((file) => formData.append("files[]", file));

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_SERVER + "/api/merge",
        formData,
        {
          responseType: "blob",

          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // create download link
      const url = window.URL.createObjectURL(new Blob([res.data]));
      setDownUrl(url);
    } catch (error) {
      console.log(error);
      alert("Something's wrong, Please try again.");
      setModal(false);
    }
  };

  // remove selected file
  const removeFile = (index: number) => {
    const newFiles = files.filter((file) => files.indexOf(file) !== index);
    setFiles((prev) => newFiles);
  };

  // display modal
  const displayModal = () => {
    setModal((prev) => true);
  };

  // close modal
  const closeModal = () => {
    setModal((prev) => false);
  };

  // < -------- * -------- >
  return (
    <main className={styles.container}>
      <div className={styles.main}>
        <h1>Merge Your Favorite PDF Files</h1>
        <p>Combine Them All With One Click.</p>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="file">Select PDF Files</label>
          <input
            onChange={handleChange}
            onClick={(e) => {
              e.currentTarget.value = "";
            }}
            id="file"
            type="file"
            multiple
            accept=".pdf"
            className={styles.button}
          />

          {/* show uploaded files */}
          {files.length > 0 && (
            <div className={styles.filesContainer}>
              <h3>drag the files to change the order</h3>

              {/* files uploaded */}
              <SortableList
                onSortEnd={onSortEnd}
                draggedItemClassName={styles.dragged}
              >
                {files.map((file, i) => {
                  return (
                    <SortableItem key={i}>
                      <FileCard
                        fileName={file.name}
                        index={i}
                        removeFile={removeFile}
                      />
                    </SortableItem>
                  );
                })}
              </SortableList>
            </div>
          )}

          {/* convert button */}
          {files.length > 1 && (
            <button onClick={displayModal} className={styles.button}>
              Convert
            </button>
          )}
        </form>

        {/* modal */}
        {modal && <Modal url={downloadUrl} closeModal={closeModal} />}
      </div>
    </main>
  );
}

export default Main;
