import type { Category } from './category';

export class CategoryStat {
	constructor(
		public category: Category | undefined,
		public count: number,
		public totalAmount: number,
	) {}
}
