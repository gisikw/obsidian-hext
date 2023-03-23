import { Hex } from './models/hex';

export function parse(input: string): Array<Hex> {
  const lines = input.split('\n');
  const hexes: Array<Hex> = [];

  lines.forEach((line) => {
    if (!line.includes('-')) {
      const coordinates = line.split(' ')[0];
      const hex = new Hex(coordinates);
      hexes.push(hex);
    }
  });

  return hexes;
}
