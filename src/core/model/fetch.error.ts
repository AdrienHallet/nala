export class FetchError extends Error {

    public status: number;
    public url: string;

    private constructor(response: Response) {
        super();
        this.status = response.status;
        this.url = response.url;
    }

    public static from(response: Response): FetchError {
        return new FetchError(response)
    }
}