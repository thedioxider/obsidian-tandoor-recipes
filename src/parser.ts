import type { TFile, Vault } from "obsidian";

import { Recipe } from "./types/recipe";
import { TandoorImport } from "./types/tandoor";

export async function parseTandoorFile(file: TFile): Promise<TandoorImport> {
	const vault: Vault = file.vault;
	return JSON.parse(await vault.read(file)) as TandoorImport;
}

export function tandoorToRecipe(tandoor: TandoorImport): Recipe {
	function cleanString(s: string | undefined | null) {
		if (typeof s !== "string") {
			return undefined;
		}
		s = s.trim();
		if (s.length === 0) {
			return undefined;
		}
		return s;
	}
	const td = tandoor;
	let recipe = new Recipe(tandoor.name);
	recipe = {
		...recipe,
		description: cleanString(td.description),
		source: cleanString(td.source_url),
		keywords:
			td.keywords.length === 0 ? undefined : td.keywords.map((v) => v.name),
		working_time: td.working_time === 0 ? undefined : td.working_time,
		waiting_time: td.waiting_time === 0 ? undefined : td.waiting_time,
		servings:
			td.servings == 0
				? undefined
				: {
						amount: td.servings,
						label: cleanString(td.servings_text),
					},
	};
	for (let tstep of td.steps) {
		recipe.steps.push({
			name: cleanString(tstep.name),
			instruction: cleanString(tstep.instruction) ?? "",
			ingredients:
				tstep.ingredients.length === 0
					? undefined
					: tstep.ingredients.map((ting) => {
							let ing: any = {};
							ing.amount =
								ting.no_amount || ting.amount == 0 ? undefined : ting.amount;
							if (ing.amount !== undefined) {
								let pl_name = cleanString(ting.food.plural_name);
								ing.name =
									(ting.always_use_plural_food || ing.amount !== 1) &&
									pl_name !== undefined
										? pl_name
										: ting.food.name;
							} else {
								ing.name = ting.food.name;
							}
							ing.name = cleanString(ing.name);
							if (ting.unit !== null && ting.unit !== undefined) {
								if (ing.amount !== undefined) {
									let pl_unit = cleanString(ting.unit.plural_name);
									ing.unit =
										(ting.always_use_plural_unit || ing.amount !== 1) &&
										pl_unit !== undefined
											? pl_unit
											: ting.unit.name;
								} else {
									ing.unit = ting.unit.name;
								}
								ing.unit = cleanString(ing.unit);
							}
							ing.note = cleanString(ting.note);
							return ing;
						}),
			time: tstep.time == 0 ? undefined : tstep.time,
		});
	}
	return recipe;
}
