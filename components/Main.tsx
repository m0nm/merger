import React from "react";
import styles from "../styles/Main.module.scss";

function Main() {
  const handleChange = (e: React.FormEvent) => {
    const { files } = e.target as HTMLInputElement;

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
            id="file"
            type="file"
            multiple
            accept=".pdf"
          />
        </form>
      </div>
    </main>
  );
}

export default Main;
