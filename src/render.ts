import { Hex } from './models/hex';

function getMinMaxXY(points: Array<string>): { minX: number; maxX: number; minY: number; maxY: number } {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  points.forEach((point) => {
    const [x, y] = point.split(',').map(parseFloat);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  });

  return { minX, maxX, minY, maxY };
}

export function render(hexes: Array<Hex>, size: number): string {
  const allPoints: Array<string> = [];
  const hexPolygons = hexes.map((hex) => {
    const points = hex.toPolygonPoints(size);
    allPoints.push(...points.split(' '));
    return `<polygon points="${points}" stroke="black" stroke-width="2" fill="lightgrey" />`;
  });

  const { minX, maxX, minY, maxY } = getMinMaxXY(allPoints);
  const viewBoxWidth = maxX - minX;
  const viewBoxHeight = maxY - minY;

  const padding = size * 0.1;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX - padding} ${minY - padding} ${viewBoxWidth + 2 * padding} ${viewBoxHeight + 2 * padding}">
      ${hexPolygons.join('\n')}
    </svg>
  `;
}

