import { Plugin } from "obsidian";

import { fileContextMenu } from "./context-menu";

export default class TandoorRecipesPlugin extends Plugin {
	async onload() {
		this.registerEvent(fileContextMenu(this));
	}

	onunload() {}

	async loadSettings() {}

	async saveSettings() {}
}
