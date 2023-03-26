import { MarkdownRenderChild } from "obsidian";
import hextMap, { HextMapId } from "../hextMap";

export class HexMap extends MarkdownRenderChild {
	containerEl: HTMLElement;

	constructor(containerEl: HTMLElement, public id: HextMapId) {
		super(containerEl);
	}

	onload() {
		this.wrapper = this.containerEl.createEl("div");
		this.subscription = hextMap.subscribe(this.id, this.render.bind(this));
	}

	render(render: string) {
		this.wrapper.innerHTML = `
			<p>HexMap from ${this.id}</p>
			<p>${render}</p>
		`;
	}

	onunload() {
		this.subscription.unsubscribe();
	}
}
