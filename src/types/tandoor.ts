export type TandoorImport = {
	name: string;
	description: string;
	keywords: {
		name: string;
		description: string;
	}[];
	working_time: number;
	waiting_time: number;
	servings: number;
	servings_text: string;
	source_url: string;
	steps: TandoorStep[];
};

type TandoorStep = {
	name: string;
	instruction: string;
	ingredients: TandoorIngredient[];
	time: number;
	order: number;
	show_as_header: boolean;
	show_ingredients_table: boolean;
};

type TandoorIngredient = {
	food: {
		name: string;
		plural_name?: string;
	};
	unit: {
		name: string;
		plural_name?: string;
		description?: string;
	};
	amount: number;
	note: string;
	order: number;
	is_header: boolean;
	no_amount: boolean;
	always_use_plural_unit: boolean;
	always_use_plural_food: boolean;
};
