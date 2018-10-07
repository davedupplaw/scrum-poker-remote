import {Message} from './Message';
import {MessageType} from './MessageType';

export class Session extends Message {
    constructor(private _name: string,
                private _id: string,
                private _facilitator: string) {
        super( MessageType.SESSION_START );
    }

    get name(): string { return this._name; }
    get id(): string { return this._id; }
    get facilitator(): string { return this._facilitator; }
}
