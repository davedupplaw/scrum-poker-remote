import {Message} from './Message';
import {MessageType} from './MessageType';

export class EndSession extends Message {
    constructor( private sessionId: string ) {
        super( MessageType.SESSION_END );
    }
}
