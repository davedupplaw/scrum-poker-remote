import {MessageType} from './MessageType';

export class Message {
    private readonly _type: MessageType;

    constructor( type: MessageType ) {
        this._type = type;
    }

    get type(): MessageType {
        return this._type;
    }
}
