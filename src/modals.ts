import { App, Modal, Setting } from "obsidian";

const pathFormat: RegExp =
	/^\/?(?:[\p{L}_\-\s0-9\.]+\/)*([\p{L}_\-\s0-9\.]+)$/iu;

export class InputFilenameModal extends Modal {
	constructor(app: App, onSubmit: (result: string) => void, init?: string) {
		super(app);
		this.setTitle("Name of the recipe file");

		let filename = "";
		new Setting(this.contentEl).addText((text) => {
			text.onChange((value) => {
				filename = value;
			});
			if (init !== undefined && pathFormat.test(init)) {
				text.setValue(init);
				filename = init;
			}
		});

		new Setting(this.contentEl).addButton((btn) =>
			btn
				.setButtonText("Apply")
				.setCta()
				.onClick(() => {
					this.close();
					onSubmit(pathFormat.test(filename) ? filename : "");
				}),
		);
	}
}
