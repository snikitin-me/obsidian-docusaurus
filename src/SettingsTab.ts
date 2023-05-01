import { App, PluginSettingTab, Setting } from "obsidian";
import ObsidianDocusaurusPlugin from "../main";

export enum Settings {
	BlogFolder,
	BlogPrefix,
}

export interface PluginSettings {
	blogFolder: string;
	blogPrefix: string;
}

export const DEFAULT_SETTINGS: Partial<PluginSettings> = {
	blogFolder: "C:/projects/docusaurus/blog",
	blogPrefix: "blog",
};

export default class SettingsTab extends PluginSettingTab {
	plugin: ObsidianDocusaurusPlugin;

	constructor(app: App, plugin: ObsidianDocusaurusPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Docusaurus folder path")
			.setDesc("...")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.blogFolder)
					.onChange(async (value) => {
						this.plugin.settings.blogFolder = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Blog page prefix/")
			.setDesc("...")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.blogPrefix)
					.onChange(async (value) => {
						this.plugin.settings.blogPrefix = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
