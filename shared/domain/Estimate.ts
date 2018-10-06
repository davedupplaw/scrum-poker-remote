import {Message} from './Message';
import {MessageType} from './MessageType';

export class Estimate extends Message {
    constructor(private whom: string, estimate: number) {
        super(MessageType.ESTIMATE);
    }
}
