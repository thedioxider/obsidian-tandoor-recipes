import { Menu, MenuItem, Notice, Plugin, TAbstractFile } from "obsidian";
import { TFile } from "obsidian";
import { recipeToMd } from "./generator";
import { InputFilenameModal } from "./modals";

import { parseTandoorFile, tandoorToRecipe } from "./parser";

export function fileContextMenu(plugin: Plugin) {
	return plugin.app.workspace.on(
		"file-menu",
		(menu: Menu, file: TAbstractFile) => {
			const vault = file.vault;
			if (file instanceof TFile && file.extension == "json") {
				menu.addItem((item: MenuItem) => {
					item
						.setTitle("Import Tandoor recipe")
						.setIcon("chef-hat")
						.onClick(async () => {
							new Notice("Converting...");
							const tandoor = await parseTandoorFile(file as TFile);
							const recipe = tandoorToRecipe(tandoor);
							const md = recipeToMd(recipe);
							new InputFilenameModal(
								plugin.app,
								(filename) => {
									if (filename === "") {
										new Notice("Invalid file name");
										return;
									}
									let filepath = `${
										plugin.app.fileManager.getNewFileParent(file.path, filename)
											.path
									}/${filename}.md`;
									let folder = filepath.split("/").slice(0, -1).join("/");
									if (vault.getFolderByPath(folder) === null) {
										vault.createFolder(folder);
									}
									if (vault.getAbstractFileByPath(filepath) !== null) {
										new Notice("File already exists");
										return;
									}
									vault.create(filepath, md);
								},
								recipe.name,
							).open();
						});
				});
			}
		},
	);
}
