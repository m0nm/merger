import React, { useState } from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";

import styles from "../styles/Main.module.scss";
import FileCard from "./FileCard";

function Main() {
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: React.FormEvent) => {
    const { files: pdfFiles } = e.target as HTMLInputElement;

    pdfFiles?.length && setFiles((prev) => [...prev, pdfFiles[0]]);
  };

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setFiles((array) => arrayMove(array, oldIndex, newIndex));
  };

  return (
    <main className={styles.container}>
      <div className={styles.main}>
        <h1>Merge Your Favorite PDF Files</h1>
        <p>Combine Them All With One Click.</p>

        <form>
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
              <h3>the order from left to right</h3>

              {/* files uploaded */}
              <SortableList
                onSortEnd={onSortEnd}
                draggedItemClassName={styles.dragged}
              >
                {files.map((file, i) => {
                  return (
                    <SortableItem key={i}>
                      <FileCard fileName={file.name} />
                    </SortableItem>
                  );
                })}
              </SortableList>
            </div>
          )}

          {/* convert button */}
          {files.length > 1 && (
            <button className={styles.button}>Convert</button>
          )}
        </form>
      </div>
    </main>
  );
}

export default Main;
