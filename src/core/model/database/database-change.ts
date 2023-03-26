export class DatabaseChange {
	constructor(public transactions: boolean | Date, public categories: boolean | Date) {}

	public hasChange() {
		return this.transactions || this.categories;
	}
}
