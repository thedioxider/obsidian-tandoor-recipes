import type { Menu, MenuItem, Plugin, TAbstractFile } from "obsidian";
import { Notice, TFile } from "obsidian";

export function fileContextMenu(plugin: Plugin) {
	return plugin.app.workspace.on(
		"file-menu",
		(menu: Menu, file: TAbstractFile) => {
			if (file instanceof TFile) {
				menu.addItem((item: MenuItem) => {
					item
						.setTitle("Fancy File!")
						.setIcon("document")
						.onClick(async () => {
						});
				});
			}
		},
	);
}
