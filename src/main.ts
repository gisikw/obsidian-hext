import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";
import { HexMap } from "./ui/hex-map";
import hextMap from "./hextMap";

interface HextPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: HextPluginSettings = {
	mySetting: "default",
};

export default class HextPlugin extends Plugin {
	settings: HextPluginSettings;

	async onload() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);

		const processor = this.registerMarkdownCodeBlockProcessor(
			"hext",
			async (source: string, el, ctx) => {
				const id = hextMap.generate(source, el, ctx);
				ctx.addChild(new HexMap(el, id));
			}
		);
		processor.sortOrder = -100;
	}

	onunload() {}
}
