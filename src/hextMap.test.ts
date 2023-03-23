import hextMap from './hextMap';
import {
	MarkdownPostProcessorContext,
	MarkdownSectionInformation
} from 'obsidian';

const ctx : MarkdownPostProcessorContext = {
	docId: '',
	sourcePath: 'source doc',
	frontmatter: '',
	addChild() {},
	getSectionInfo: () => ({
		text: '',
		lineStart: 10,
		lineEnd: 42
	})
};
// @ts-ignore
const el : HTMLElement = 'fake el';

test('generate, subscribe, and change a hextMap', () => {
	const id = hextMap.generate("0000 water", el, ctx);
	let count = 0;
	const subscription = hextMap.subscribe(id, () => { count++; });
	hextMap.generate("0000 forest", el, ctx);
	subscription.unsubscribe();
	hextMap.generate("0000 desert", el, ctx);
	expect(count).toBe(2);
});
