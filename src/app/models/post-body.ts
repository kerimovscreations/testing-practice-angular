export interface IPostBody {
    username: string;
}

export class PostBody implements IPostBody {
    constructor(public username: string) { }
}
