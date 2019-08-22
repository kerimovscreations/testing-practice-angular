export enum ModalType {
    TYPE_1,
    TYPE_2
}

export interface IModalData {
    type: ModalType;
}

export class ModalData implements IModalData {
    constructor(public type: ModalType) { }
}

