export class Recipe {
	name: string;
	description?: string;
	source?: string;
	keywords?: string[];
	working_time?: number;
	waiting_time?: number;
	servings?: {
		amount: number;
		label?: string;
	};
	steps: RecipeStep[];

	constructor(name: string) {
		this.name = name;
		this.steps = [];
	}
}

class RecipeStep {
	name?: string;
	instruction: string;
	ingredients?: RecipeIngredient[];
	time?: number;
}

class RecipeIngredient {
	name: string;
	amount?: number;
	unit?: string;
	note?: string;
}
