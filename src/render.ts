import { Hex } from "./renderables/hex";

function getMinMaxXY(
	hexes: Array<Hex>,
	size: number
): { minX: number; maxX: number; minY: number; maxY: number } {
	const boundaries = hexes.reduce(
		(acc, hex) => {
			const [r, q] = [hex.row(), hex.col()];
			if (r < acc[0].row()) acc[0] = hex;
			if (r > acc[1].row()) acc[1] = hex;
			if (q < acc[2].col()) acc[2] = hex;
			if (q > acc[3].col()) acc[3] = hex;
			return acc;
		},
		[hexes[0], hexes[0], hexes[0], hexes[0]]
	);
	const vertices = boundaries.flatMap((h) => h.vertices(size));
	const xs = vertices.map(([x, y]) => x);
	const ys = vertices.map(([x, y]) => y);
	const minX = Math.min(...xs);
	const maxX = Math.max(...xs);
	const minY = Math.min(...ys);
	const maxY = Math.max(...ys);
	return { minX, maxX, minY, maxY };
}

export function render(hexes: Array<Hex>, size: number): string {
	const { minX, maxX, minY, maxY } = getMinMaxXY(hexes, size);
	const viewBoxWidth = maxX - minX;
	const viewBoxHeight = maxY - minY;
	const padding = size * 0.1;
	return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX - padding} ${
		minY - padding
	} ${viewBoxWidth + 2 * padding} ${viewBoxHeight + 2 * padding}">
      ${hexes.map((h) => h.render(size)).join("\n")}
    </svg>
  `;
}
