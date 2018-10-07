import {Message} from './Message';
import {MessageType} from './MessageType';

export class Estimate extends Message {
    constructor(private _whom: string, private _estimate: string,
                private _story: string, private _sessionId: string) {
        super(MessageType.ESTIMATE);
    }

    get whom(): string { return this._whom; }
    get estimate(): string { return this._estimate; }
    get story(): string { return this._story; }
    get sessionId(): string { return this._sessionId; }
}
