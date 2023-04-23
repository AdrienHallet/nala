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
	addDBCategory(toAdd).then(() => {
		prepend(categories, toAdd);
		categoriesChange.set(new Date());
	});
};

export const updateCategory = (toUpdate: Category) => {
	updateDBCategory(toUpdate).then(() => {
		update(categories, toUpdate);
		categoriesChange.set(new Date());
	});
};

export const deleteCategory = (toDelete: Category) => {
	deleteDBCategory(toDelete).then(() => {
		remove(categories, toDelete);
		categoriesChange.set(new Date());
	});
};
