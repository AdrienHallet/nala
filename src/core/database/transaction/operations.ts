import {
	addDBTransaction,
	deleteDBTransaction,
	getDBTransactions,
	updateDBTransaction,
} from './queries';
import type { Transaction } from '$core/model/database/transaction';
import { init, prepend, remove, update } from '$core/database/common/store-operations';
import { transactions, transactionsChange } from '$core/database/transaction/state';
import { setLoading } from '$core/loading/operations';
import { LoadingComponent } from '$core/model/loading/component';

let isInitialized = false;

export async function getTransactions() {
	setLoading(LoadingComponent.TRANSACTIONS, true);
	if (!isInitialized) {
		isInitialized = true;
		setTransactions(await getDBTransactions());
	}
	setLoading(LoadingComponent.TRANSACTIONS, false);
	return transactions;
}

export const setTransactions = (toSet: Transaction[]) => {
	init(transactions, toSet);
	transactionsChange.set(false);
};

export const addTransaction = (toAdd: Transaction) => {
	addDBTransaction(toAdd).then(() => {
		prepend(transactions, toAdd);
		transactionsChange.set(new Date());
	});
};

export const updateTransaction = (toUpdate: Transaction) => {
	updateDBTransaction(toUpdate).then(() => {
		update(transactions, toUpdate);
		transactionsChange.set(new Date());
	});
};

export const deleteTransaction = (toDelete: Transaction) => {
	deleteDBTransaction(toDelete).then(() => {
		remove(transactions, toDelete);
		transactionsChange.set(new Date());
	});
};
