import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

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

		// Handle rendering the map
		const processor = this.registerMarkdownCodeBlockProcessor("hext", async (source: string, el, ctx) => {
			const div = el.createEl("div");
			div.innerHTML = "<p>This is a placeholder for the rendered map</p>";
        });
		processor.sortOrder = -100;
	}

	onunload() {

	}
}
