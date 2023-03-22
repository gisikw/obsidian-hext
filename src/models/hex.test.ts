import { Hex } from './hex';

test('instantiation by offset coordinates', () => {
	const h = new Hex('0203');

	expect(h.q).toBe(2);
	expect(h.r).toBe(2);
	expect(h.s).toBe(-4);

	expect(h.col()).toBe(2);
	expect(h.row()).toBe(3);
});
