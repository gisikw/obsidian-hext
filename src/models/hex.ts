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
}
