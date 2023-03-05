import type { Category } from '../../model/database/category';
import { addDBCategory, deleteDBCategory, getDBCategories, updateDBCategory } from './queries';
import { init, prepend, remove, update } from '$core/database/common/store-operations';
import { setLoading } from '$core/loading/operations';
import { LoadingComponent } from '$core/model/loading/component';
import { categories, categoriesChange } from './state';

let isInitialized = false;

export async function getCategories() {
	setLoading(LoadingComponent.CATEGORIES, true);
	if (!isInitialized) {
		isInitialized = true;
		setCategories(await getDBCategories());
	}
	setLoading(LoadingComponent.CATEGORIES, false);
	return categories;
}

export const setCategories = (toSet: Category[]) => {
	init(categories, toSet);
	categoriesChange.set(false);
};

export const addCategory = (toAdd: Category) => {
	prepend(categories, toAdd);
	addDBCategory(toAdd);
	categoriesChange.set(new Date());
};

export const updateCategory = (toUpdate: Category) => {
	update(categories, toUpdate);
	updateDBCategory(toUpdate);
	categoriesChange.set(new Date());
};

export const deleteCategory = (toDelete: Category) => {
	remove(categories, toDelete);
	deleteDBCategory(toDelete);
	categoriesChange.set(new Date());
};
