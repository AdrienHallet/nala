export class Result<T, E> {

    private constructor(
        private value: T | null,
        private error: E | null,
    ) {
        // Only build from static methods
    }

    public static ok<T, E>(value: T) {
        return new Result<T, E>(value, null);
    }

    public static err<T, E>(error: E) {
        return new Result<T, E>(null, error);
    }

    public isOk(): boolean {
        return this.value != null;
    }

    public ok(): T {
        if (this.value == null) {
            throw new Error('Tried to get an erroneous result value, is the error flow defined?');
        }
        return this.value;
    }

    public err(): E {
        if (this.error == null) {
            throw new Error('Tried to get a valid result error, is the valid flow defined?');
        }
        return this.error;
    }

    public map<T2>(mappingFunction: (value: T) => T2): Result<T2, E> {
        if (this.isOk()) {
            return Result.ok(mappingFunction(this.ok()));
        }
        return Result.err(this.err());
    }
}