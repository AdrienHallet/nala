export class Transaction {
	id?: number;
	date?: string; // YYYY-MM-DD
	amount?: number; // CENT amount of the transaction
	title?: string;
	categoryId?: number;

	constructor() {
		// New transactions assume today
		this.date = new Date().toISOString().split('T')[0];
	}

	equals(other: Transaction) {
		return (
			this.id === other.id &&
			this.date === other.date &&
			this.amount === other.amount &&
			this.title === other.title &&
			this.categoryId === other.categoryId
		);
	}
}

export function getMonth(transaction: Transaction): string {
	return transaction.date?.substring(0, 7) ?? '????-??';
}
