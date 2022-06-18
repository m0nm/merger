import Head from "next/head";
import Navbar from "../components/Navbar";
import Main from "../components/Main";

function Home() {
  return (
    <div>
      <Head>
        <title>merger | Merge your favourtie</title>
      </Head>

      <Navbar />
      <Main />

      <footer>
        <a href="https://github.com/m0nm">Made with ❤️ By m0nm</a>
      </footer>
    </div>
  );
}

export default Home;
