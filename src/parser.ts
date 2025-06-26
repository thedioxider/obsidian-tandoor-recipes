import type { TFile, Vault } from "obsidian";

import { Recipe } from "./types/recipe";
import { TandoorImport } from "./types/tandoor";

export async function parseTandoorFile(file: TFile): Promise<TandoorImport> {
	const vault: Vault = file.vault;
	return JSON.parse(await vault.read(file)) as TandoorImport;
}

export function tandoorToRecipe(tandoor: TandoorImport): Recipe {
	let recipe = new Recipe(tandoor.name);
	return recipe;
}
