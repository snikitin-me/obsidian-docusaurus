import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import Docusaurus from "./src/Docusaurus";
import { getTagFiles } from './src/utils/tags';

// import SettingsTab, { DEFAULT_SETTINGS, PluginSettings } from './src/SettingsTab';
import SettingsTab, {
	DEFAULT_SETTINGS,
	PluginSettings
} from "./src/SettingsTab";

export default class ObsidianDocusaurusPlugin extends Plugin {
	settings: PluginSettings
	blog: Docusaurus


	async onload() {
		await this.loadSettings();

		this.blog = new Docusaurus(this.settings)

		this.addDocusaurusRibbonIcon()

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SettingsTab(this.app, this));
		console.log("ObsidianDocusaurusPlugin - onload");
	}

	async addDocusaurusRibbonIcon() {
		const ribbonIconEl = this.addRibbonIcon('layout', 'Export blog', (evt: MouseEvent) => {

			if (this.blog.setting.blogPrefix === "") {
				throw new Error("blogFolder is empty")
			}

			let filesWithTags = getTagFiles(this.app, this.settings.blogPrefix)
			this.blog.copyFilesToBlog(filesWithTags)
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
