import { derived, type Readable, writable, type Writable } from 'svelte/store';
import type { Category } from '../../model/database/category';
import type { CategoryCount } from '../../model/database/category-count';
import { transactions } from '../transaction/state';
import { categoryCountFn } from './count-function';

export const categories: Writable<Category[]> = writable();
export const categoryCountState: Readable<CategoryCount[]> = derived(
	[transactions, categories],
	categoryCountFn,
);

export const categoriesChange: Writable<boolean | Date> = writable(false);
