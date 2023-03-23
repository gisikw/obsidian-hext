import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { HexMap } from './ui/hex-map';

interface HextPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: HextPluginSettings = {
	mySetting: 'default'
}

export default class HextPlugin extends Plugin {
	settings: HextPluginSettings;

	async onload() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

		// We can eventually cache the map results here
		const mapMap = new Map();

		// Handle rendering the map
		const processor = this.registerMarkdownCodeBlockProcessor("hext", async (source: string, el, ctx) => {
			const { lineStart, lineEnd } = ctx.getSectionInfo(el);
			const key=`${ctx.sourcePath},${lineStart},${lineEnd}`;
			mapMap.set(key, `Map last updated at ${Date.now()}`);
			ctx.addChild(new HexMap(el, key, this.app, mapMap));
			this.app.workspace.trigger("hext:refresh-views");
        });
		processor.sortOrder = -100;
	}

	onunload() {

	}
}
