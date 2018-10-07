import {Message} from './Message';
import {Registration} from './Registration';
import {MessageType} from './MessageType';

export class ActiveParticipants extends Message {
    constructor( private participants: Registration[] = [] ) {
        super( MessageType.ACTIVE_PARTICIPANTS );
    }
}
