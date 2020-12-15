import React from "react";
import Head from "next/head";
import letThereBe from "../pieces/let-there-be";

const draw = (node, { height, width }) =>
  import("p5").then((p5) => {
    new p5.default(letThereBe({ height, width }), node);
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
    updateDrawing();

    return () => {
      window.removeEventListener("resize", updateDrawing);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>ART x CODE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="fixed top-0 left-0 bottom-0 right-0" ref={canvas}></div>
      <main className="fixed top-0 left-0 bottom-0 right-0 z-10 flex items-center justify-center">
        <h1 className="text-7xl text-yellow-300">✞</h1>
      </main>
    </div>
  );
}
