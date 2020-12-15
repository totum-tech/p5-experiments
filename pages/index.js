import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const renderArt = ({ height, width }) => (sketch) => {
  sketch.setup = () => {
    sketch.createCanvas(width, height);
  };
  sketch.draw = () => {
    sketch.background(0);
  };
};

const draw = (node, { height, width }) =>
  import("p5").then((p5) => {
    console.log({ height, width });
    new p5.default(renderArt({ height, width }), node);
  });

export default function Home() {
  const canvas = React.useRef();

  React.useEffect(() => {
    const updateDrawing = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      draw(canvas.current, { height, width });
    };
    window.addEventListener("resize", updateDrawing);

    return () => {
      window.removeEventListener("resize", updateDrawing);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>ART x CODE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="fixed top-0 left-0 bottom-0 right-0" ref={canvas}></div>
      <main className="fixed top-0 left-0 bottom-0 right-0 z-10 flex items-center justify-center">
        <h1 className="text-8xl text-white">✞</h1>
      </main>
    </div>
  );
}
