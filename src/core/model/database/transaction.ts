export class Transaction {
	id?: number;
	date?: string;
	amount?: number; // CENT amount of the transaction
	title?: string;
	categoryId?: number;

	constructor() {
		// New transactions assume today
		this.date = new Date().toISOString().split('T')[0];
	}
}
