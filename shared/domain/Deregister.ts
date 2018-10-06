import {Registration} from './Registration';
import {Message} from './Message';
import {MessageType} from './MessageType';

export class Deregister extends Message {
    constructor(private registration: Registration) {
        super( MessageType.DEREGISTRATION );
    }
}