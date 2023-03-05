import { writable, type Writable } from 'svelte/store';
import type { Category } from '../../model/database/category';

export const categories: Writable<Category[]> = writable();

export const categoriesChange: Writable<boolean | Date> = writable(false);
