import type { Category } from './category';

export class CategoryCount {
	constructor(public category: Category | undefined, public count: number) {}
}
