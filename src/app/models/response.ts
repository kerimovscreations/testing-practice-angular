export interface IStatusResponse {
    status: number;
    message: string;
}

export class StatusResponse implements IStatusResponse {
    constructor(public status: number,
                public message: string) { }
}
