export class Optional<T> {

    private constructor(
        private value: T | null,
    ) { }

    public static of<T>(value: T) {
        return new Optional<T>(value);
    }

    public static empty<T>() {
        return new Optional<T>(null);
    }

    public get(): T {
        return this.value as T;
    }

    public isPresent(): boolean {
        return this.value == null;
    }
}