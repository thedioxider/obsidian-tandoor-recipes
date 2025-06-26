import { App, Modal, Notice, Setting } from "obsidian";

const pathFormat: RegExp = /^\/?(?:[a-z_\-\s0-9\.]+\/)?([a-z_\-\s0-9\.]+)$/i;

export class InputFilenameModal extends Modal {
	constructor(app: App, onSubmit: (result: string) => void, init?: string) {
		super(app);
		this.setTitle("Path of the recipe file");

		let filepath = "";
		new Setting(this.contentEl).addText((text) =>
			text
				.setValue(init !== undefined && pathFormat.test(init) ? init : "")
				.onChange((value) => {
					filepath = value;
				}),
		);

		new Setting(this.contentEl).addButton((btn) =>
			btn
				.setButtonText("Apply")
				.setCta()
				.onClick(() => {
					this.close();
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
