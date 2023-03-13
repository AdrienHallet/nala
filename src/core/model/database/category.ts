export class Category {
	constructor(public id?: number, public name?: string, public description?: string) {}

	equals(other: Category) {
		return (
			this.id === other.id && this.name === other.name && this.description === other.description
		);
	}
}
