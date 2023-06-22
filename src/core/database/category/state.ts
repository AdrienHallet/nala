import { derived, type Readable, writable, type Writable } from 'svelte/store';
import type { Category } from '../../model/database/category';
import type { CategoryStat } from '../../model/database/category-stat';
import { transactions } from '../transaction/state';
import { categoryStatsFn } from './count-function';

export const categories: Writable<Category[]> = writable();
export const categoryStatsState: Readable<CategoryStat[]> = derived(
	[transactions, categories],
	categoryStatsFn,
);

export const categoriesChange: Writable<boolean | Date> = writable(false);
