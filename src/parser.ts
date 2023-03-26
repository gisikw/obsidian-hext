import { Hex } from "./renderables/hex";

export function parse(input: string): Array<Hex> {
	const lines = input.split("\n").filter((line) => line);
	const hexes: Array<Hex> = [];

	lines.forEach((line) => {
		if (!line.split(" ")[0].includes("-")) {
			const hex = new Hex(line);
			hexes.push(hex);
		}
	});

	return hexes;
}
