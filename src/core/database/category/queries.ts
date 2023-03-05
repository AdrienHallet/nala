import { NalaDatabase } from '$core/database/database';
import type { Category } from '$core/model/database/category';

export const getDBCategories = async (): Promise<Category[]> => {
	return (await NalaDatabase.get()).categories.toArray();
};

export const addDBCategory = async (toAdd: Category): Promise<number> => {
	return (await NalaDatabase.get()).categories.add(toAdd);
};

export const updateDBCategory = async (toUpdate: Category): Promise<number> => {
	if (toUpdate.id == null) {
		throw Error('Unexpected empty id');
	}
	return (await NalaDatabase.get()).categories.update(toUpdate.id, toUpdate);
};

export const deleteDBCategory = async (toDelete: Category): Promise<void> => {
	if (toDelete.id == null) {
		throw Error('Unexpected empty id');
	}
	return (await NalaDatabase.get()).categories.delete(toDelete.id);
};
