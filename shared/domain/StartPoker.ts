import {Message} from './Message';
import {MessageType} from './MessageType';

export class StartPoker extends Message {
    constructor(private _id: string) {
        super( MessageType.START_POKER );
    }

    get id(): string { return this._id; }
}
