import {Story} from './Story';
import {Estimate} from './Estimate';
import {Message} from './Message';
import {MessageType} from './MessageType';

export class EstimatedStory extends Message {
    constructor( private _sessionId: string, private _story: Story,
                 private _estimates: { [whom: string]: Estimate } ) {
        super( MessageType.ESTIMATED_STORY );
    }

    get sessionId() { return this._sessionId; }
    get story() { return this._story; }
    get estimates() { return this._estimates; }
}
