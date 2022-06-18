import Image from "next/image";
import React, { useState } from "react";
import styles from "../styles/Main.module.scss";
import FileCard from "./FileCard";

function Main() {
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: React.FormEvent) => {
    const { files: pdfFiles } = e.target as HTMLInputElement;

    pdfFiles?.length && setFiles((prev) => [...prev, pdfFiles[0]]);

    console.log(files);
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
              <div>
                {files.map((file, i) => {
                  return <FileCard fileName={file.name} key={i} />;
                })}
              </div>
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
