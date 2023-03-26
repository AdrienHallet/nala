import { derived, type Readable, writable, type Writable } from 'svelte/store';
import { getMonth } from '../../model/database/transaction';
import { Balance } from '../../model/stats/balance';
import type { Transaction } from '../../model/database/transaction';
import { Monthly } from '../../model/stats/monthly';
import { transactions } from '../transaction/state';

const actuator = (origin: Transaction[], set: (value: Balance[]) => void) => {
	if (!origin || origin.length < 1) {
		set([]);
		return;
	}

	const orderedTransactions = [...origin].sort((a, b) =>
		(a.date || '').localeCompare(b.date || ''),
	);

	const dailyBalances: Balance[] = [];
	const monthlies: Monthly[] = [];
	let totalAmount = 0;

	let currentDay: Balance = new Balance(orderedTransactions[0].date || '?', 0);
	let currentMonth: Monthly = new Monthly(getMonth(orderedTransactions[0]), 0, 0);
	orderedTransactions.forEach((transaction) => {
		if (currentDay.date !== transaction.date) {
			dailyBalances.push(currentDay);
			currentDay = new Balance(transaction.date || '?', currentDay.amount);
		}
		if (currentMonth.month !== getMonth(transaction)) {
			monthlies.push(currentMonth);
			currentMonth = new Monthly(getMonth(transaction), 0, 0);
		}

		const transactionAmount = Number(transaction.amount ?? 0) / 100;

		currentDay.amount = Number(currentDay.amount) + transactionAmount;
		if (transactionAmount < 0) {
			currentMonth.expense += transactionAmount;
		} else {
			currentMonth.income += transactionAmount;
		}
		totalAmount += transactionAmount;
	});
	dailyBalances.push(currentDay);
	monthlies.push(currentMonth);

	total.set(totalAmount);
	monthlyState.set(monthlies);
	set(dailyBalances);
};

export const dailyState: Readable<Balance[]> = derived(transactions, actuator);
export const monthlyState: Writable<Monthly[]> = writable([]);

export const total: Writable<number> = writable(0);
