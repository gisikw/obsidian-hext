export class Hex {
	q: number
	r: number
	s: number

	constructor(coordinates: string) {
		const col = parseInt(coordinates.slice(0,2));
		const row = parseInt(coordinates.slice(2,4));
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

	toPolygonPoints(size: number): string {
		const angles = [0, 60, 120, 180, 240, 300].map((deg) => (Math.PI / 180) * deg);
		const yOffset = this.q % 2 === 1 ? size * Math.sqrt(3) / 2 : 0;
		const points = angles.map((angle) => {
			const x = size * Math.cos(angle) + this.q * size * 1.5;
			const y = size * Math.sin(angle) + yOffset + this.row() * size * Math.sqrt(3);
			return `${x},${y}`;
		});
		return points.join(' ');
	}
}
