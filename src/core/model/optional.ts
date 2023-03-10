export class Optional<T> {
	private constructor(private value: T | null) {}

	public static of<T>(value: T) {
		return new Optional<T>(value);
	}

	public static ofNullable<T>(value: T | null): Optional<T> {
		if (value == null) {
			return this.empty<T>();
		}
		return this.of<T>(value);
	}

	public static empty<T>() {
		return new Optional<T>(null);
	}

	public get(): T {
		if (this.value == null) {
			throw new Error('Tried to get an optional null value, is the empty flow defined?');
		}
		return this.value as T;
	}

	public isPresent(): boolean {
		return this.value != null;
	}

	public or<Other>(other: Other): T | Other {
		return this.value ?? other;
	}
}
