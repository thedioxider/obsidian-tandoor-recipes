import { App, Modal, Notice, Setting } from "obsidian";

export class InputFilenameModal extends Modal {
	constructor(app: App, onSubmit: (result: string) => void) {
		super(app);
		this.setTitle("Path of the recipe file");

		let filepath = "";
		new Setting(this.contentEl).addText((text) =>
			text.onChange((value) => {
				filepath = value;
			}),
		);

		new Setting(this.contentEl).addButton((btn) =>
			btn
				.setButtonText("Apply")
				.setCta()
				.onClick(() => {
					this.close();
					const pathFormat = /^\/?(?:[a-z_\-\s0-9\.]+\/)?([a-z_\-\s0-9\.]+)$/i;
					if (pathFormat.test(filepath)) {
						onSubmit(filepath);
					} else {
						new Notice("Illegal file path");
						onSubmit("");
					}
				}),
		);
	}
}
