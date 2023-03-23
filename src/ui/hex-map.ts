import { MarkdownRenderChild } from "obsidian";

export class HexMap extends MarkdownRenderChild {
	containerEl: HTMLElement;

	constructor(containerEl: HTMLElement, public id: string, public app, public mapMap: Map<Any>) {
		super(containerEl);
	}

	onload() {
		this.wrapper = this.containerEl.createEl('div');
		this.render();
		this.registerEvent(this.app.workspace.on('hext:refresh-views', this.render.bind(this)));
	}

	render() {
		this.wrapper.innerHTML = `
			<p>HexMap from ${this.id}</p>
			<p>${this.mapMap.get(this.id)}</p>
		`;
	}

	onunload() {
	}
}
