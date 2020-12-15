import React from "react";
import Head from "next/head";

const renderArt = ({ height, width }) => (sketch) => {
  let generation = 7;
  const density = 1.3;
  const radius = 210;
  let centerX = width / 2;
  let centerY = height / 2;

  sketch.setup = () => {
    sketch.createCanvas(width, height);
    sketch.background(255);
  };

  const drawCircle = (x, y, generation, color) => {
    const divisor = 740;
    sketch.fill(color);
    sketch.noStroke();
    sketch.circle(x, y, (radius * 1) / divisor + generation * 0.3);
  };

  sketch.draw = () => {
    const x = Math.cos(generation);
    const y = Math.sin(generation);
    const shake = sketch.random(-3, 3);

    let color = [
      255 - generation * 0.7,
      255 - generation * 0.3,
      255 - generation * 0.1,
    ];

    drawCircle(
      x * (generation * (1 / density)) + centerX + shake,
      y * (generation * (1 / density)) + centerY + shake,
      generation,
      color
    );

    generation++;
  };
};

const draw = (node, { height, width }) =>
  import("p5").then((p5) => {
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
