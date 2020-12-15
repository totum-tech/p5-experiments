const render = ({ height, width }) => (sketch) => {
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

export default render;
