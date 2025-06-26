import { Recipe } from "./types/recipe";

export function recipeToMd(recipe: Recipe) {
	const r = recipe;
	let md = ``;

	let frontmatter = ``;
	// TODO customizable frontmatter property names
	if (r.servings !== undefined)
		frontmatter +=
			`servings: "${r.servings.amount}` +
			`${r.servings.label === undefined ? "" : " " + r.servings.label}"\n`;
	if (r.source !== undefined) frontmatter += `source: "${r.source}"\n`;
	if (r.keywords !== undefined) {
		frontmatter += `keywords:\n`;
		for (let kw of r.keywords) {
			frontmatter += `  - ${kw}\n`;
		}
	}
	// TODO converting duration
	if (r.working_time !== undefined)
		frontmatter += `working_time: "${r.working_time} min"\n`;
	if (r.waiting_time !== undefined)
		frontmatter += `waiting_time: "${r.waiting_time} min"\n`;
	if (frontmatter !== "") {
		md += `\
---
${frontmatter}\
---
`;
	}

	md += `# ${r.name}\n\n`;
	if (r.description !== undefined) {
		for (let line of r.description.split("\n")) {
			md += `> ${line}\n`;
		}
		md += `\n`;
	}
	for (let step of r.steps) {
		md += `---\n`;
		// TODO ingredient notes as footnotes
		if (step.ingredients !== undefined) {
			for (let ing of step.ingredients) {
				md += `- ${ing.name}`;
				if (ing.amount !== undefined) {
					md += `: ${ing.amount}`;
					if (ing.unit !== undefined) {
						md += ` ${ing.unit}`;
					}
				}
				md += `\n`;
			}
		}
		// TODO insert step time
		if (step.name !== undefined) {
			md += `\n## ${step.name}\n`;
		}
		md += `\n${step.instruction}\n\n`;
	}

	return md;
}
