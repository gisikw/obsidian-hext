import {
	MarkdownPostProcessorContext,
	MarkdownSectionInformation
} from 'obsidian';
import { render } from './render';
import { parse } from './parser';

export interface HextMapId {
	sourcePath: string;
	lineStart: number;
}

interface HextMap {
	input: string;
	render: string;
	subscriptions: ((render: string) => void)[];
}

const maps = new Map();

function get({ sourcePath, lineStart }: HextMapId): HextMap {
	if (!maps.has(sourcePath)) maps.set(sourcePath, new Map());
	const sourceMap = maps.get(sourcePath);
	if (!sourceMap.has(lineStart)) sourceMap.set(lineStart, {
		input: '',
		render: '',
		subscriptions: []
	});
	return sourceMap.get(lineStart);
}

function generate(input: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): HextMapId {
	const id = {
		sourcePath: ctx.sourcePath,
		lineStart: ctx.getSectionInfo(el)!.lineStart,
	};
	const map = get(id);
	map.input = input;
	map.render = render(parse(input), 100);
	map.subscriptions.forEach(s => s(map.render));
	return id;
}

function subscribe(id: HextMapId, cb: (render: string) => void) {
	cb(get(id).render);
	const map = get(id);
	map.subscriptions.push(cb);
	return {
		unsubscribe() {
			map.subscriptions.splice(map.subscriptions.indexOf(cb), 1);
		}
	}
}

export default { generate, subscribe }
