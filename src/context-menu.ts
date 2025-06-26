import type { Menu, MenuItem, Plugin, TAbstractFile } from "obsidian";
import { Notice, TFile } from "obsidian";

import { parseTandoorFile, tandoorToRecipe } from "./parser";

export function fileContextMenu(plugin: Plugin) {
	return plugin.app.workspace.on(
		"file-menu",
		(menu: Menu, file: TAbstractFile) => {
			if (file instanceof TFile && file.extension == "json") {
				menu.addItem((item: MenuItem) => {
					item
						.setTitle("Import Tandoor recipe")
						.setIcon("chef-hat")
						.onClick(async () => {
							const tandoor = await parseTandoorFile(file as TFile);
							const recipe = tandoorToRecipe(tandoor);
							new Notice(recipe.name);
						});
				});
			}
		},
	);
}
