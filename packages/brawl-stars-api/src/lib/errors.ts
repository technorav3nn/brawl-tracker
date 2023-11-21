export class SupercellAPIClientError extends Error {
	public readonly message: string;
	public readonly reason: string;
	public readonly status: number;

	public constructor(message: string, reason: string, status: number) {
		super(`SupercellAPIClientError: Request failed with status code ${status}: ${message} (${reason})`);

		this.message = message;
		this.reason = reason;
		this.status = status;

		this.name = "SupercellAPIClientError";
	}
}
