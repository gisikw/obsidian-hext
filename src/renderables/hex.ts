import { icons } from "../icons";
// TODO: Put me somewhere better
// https://www.pixilart.com/palettes/sparkles-palette-140
const TERRAIN_COLORS: any = {
	grass: {
		fg: "#81967E",
		bg: "#AFCFC2",
	},
	desert: {
		bg: "#D9D7A1",
		fg: "#E6EBD6",
	},
	water: {
		fg: "#4E6474",
		bg: "#6A8A99",
	},
	forest: {
		fg: "#4E6E60",
		bg: "#81967E",
	},
};

export class Hex {
	q: number;
	r: number;
	s: number;
	terrain: string | undefined;
	icon: string | undefined;

	constructor(input: string) {
		const tokens = input.split(/\s+/);
		let token = tokens.shift()!;
		const col = parseInt(token.slice(0, 2));
		const row = parseInt(token.slice(2, 4));

		if (tokens.length) this.terrain = tokens.shift();
		if (tokens.length) this.icon = tokens.shift();

		this.q = col;
		this.r = row - Math.floor(col / 2);
		this.s = -col - this.r;
	}

	col() {
		return this.q;
	}

	row() {
		return this.r + Math.floor(this.q / 2);
	}

	vertices(size: number): number[][] {
		const angles = [0, 60, 120, 180, 240, 300].map(
			(deg) => (Math.PI / 180) * deg
		);
		const yOffset = this.q % 2 === 1 ? (size * Math.sqrt(3)) / 2 : 0;
		return angles.map((angle) => [
			size * Math.cos(angle) + this.q * size * 1.5,
			size * Math.sin(angle) + yOffset + this.row() * size * Math.sqrt(3),
		]);
	}

	center(size: number): [number, number] {
		return [
			((size * 3) / 2) * this.q,
			size * ((Math.sqrt(3) / 2) * this.q + Math.sqrt(3) * this.r),
		];
	}

	render(size: number): string {
		const { bg, fg } =
			this.terrain && TERRAIN_COLORS[this.terrain]
				? TERRAIN_COLORS[this.terrain]
				: { bg: "lightgrey", fg: "black" };

		const pointString = this.vertices(size)
			.map(([x, y]) => `${x},${y}`)
			.join(" ");
		const hexagon = `<polygon points="${pointString}" stroke="black" stroke-width="2" fill="${bg}" />`;

		if (!this.icon || !icons[this.icon]) return hexagon;
		const iconSVG = icons[this.icon];

		console.log("Trying to make one");

		const [centerX, centerY] = this.center(size);

		const point = `<circle cx=${centerX} cy=${centerY} r=10 fill="red" />`;

		const iconSize = size;
		const iconX = centerX - iconSize;
		const iconY = centerY - iconSize / 2;

		const icon = `<g transform="translate(${iconX}, ${iconY}) scale(${
			iconSize / 512
		})" style="fill: ${fg}">${iconSVG.replace(/fill="[^"]+"/, "")}</g>`;

		return hexagon + icon; // + point;
	}
}
