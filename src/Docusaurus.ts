import { App,TFile } from "obsidian";
import * as fs from 'fs';
import * as path from 'path';
import { PluginSettings } from "./SettingsTab";

export default class Docusaurus {
	setting: PluginSettings;

	constructor(setting: PluginSettings) {
		this.setting = setting;
	}

	async copyFilesToBlog(filesWithTags: TFile[]){

		for await (const file of filesWithTags) {
			const fileContent = await file.vault.read(file);


			if(this.setting.blogPrefix === ""){
				throw new Error("blogFolder is empty")
			}

			// FIXME TS ERROR: Property 'getBasePath' does not exist on type 'DataAdapter'.
			const normalizedPath = path.join(file.vault.adapter.getBasePath(), file.path);

			// TODO: configure new path
			const fileName = file.name.replace(" ", "-")
			const normalizedNewPath = path.join(this.setting.blogFolder, fileName);

			// file.vault.adapter.copy(normalizedPath, normalizedNewPath);
			this.copyFile(normalizedPath, normalizedNewPath);
			console.log(normalizedPath, normalizedNewPath)
		}
	}

	copyFile(normalizedPath: string, normalizedNewPath: string){
		// File destination.txt will be created or overwritten by default.
		fs.copyFile(normalizedPath, normalizedNewPath, (err) => {
			if (err) throw err;
			console.log(`${normalizedPath} was copied to ${normalizedNewPath}`);
		});
	}
}
